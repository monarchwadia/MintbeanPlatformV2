const UserDao = require("../daos/UserDao");
const { v4: uuidv4 } = require("uuid");
const { hash, compare, objToBase64 } = require("../utils/encryption");
const {
  sendResetTokenLink,
  sendWelcomeMessage
} = require("../services/mailerService");
const { sanitize } = require("../utils/sanitize");

// UTILITIES ***********************************
const TOKEN_EXPIRE_HOURS = 48;

const isValidUserToken = async function(user, token, hrsThreshold) {
  if (!user) return false;
  if (!user.reset_token_created_at) return false;
  if (!user.reset_token) return false;

  // check for token match
  const isMatchingToken = await compare(token, user.reset_token);
  if (!isMatchingToken) return false;
  // check for expiration
  const tokenCreatedAt = new Date(user.reset_token_created_at);
  const resetTokenExpirationDate = tokenCreatedAt.setHours(
    tokenCreatedAt.getHours() + hrsThreshold
  );
  const now = new Date();
  const isValidTokenDate = now <= resetTokenExpirationDate;
  return isValidTokenDate ? true : false;
};

// QUERYING SERVICES ***************************
const checkResetToken = ({ email, token }) => {
  return new Promise(async (resolve, reject) => {
    let user;
    try {
      user = await UserDao.findOneWhere({ email });
      if (!user) {
        reject("Invalid or expired token.");
      }
    } catch (e) {
      reject(e);
    }

    const isValidToken = await isValidUserToken(
      user,
      token,
      TOKEN_EXPIRE_HOURS
    );

    if (isValidToken) {
      resolve(email);
    } else {
      reject("Invalid or expired token.");
    }
  });
};

// MUTATING SERVICES ***************************
const sendResetEmail = email => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await UserDao.findOneWhere({ email });

      if (user) {
        // if user exists: a password reset token is generated.
        const resetToken = uuidv4();

        // The bcrypt of the token is saved on the user object.
        const hashedResetToken = await hash(resetToken);

        try {
          await UserDao.updateOneWhere(
            { email },
            {
              reset_token: hashedResetToken,
              reset_token_created_at: new Date()
            }
          );
        } catch {
          reject();
        }

        sendResetTokenLink(user.email, resetToken);
      }
      resolve();
    } catch {
      reject();
    }
  });
};

module.exports = { sendResetEmail, checkResetToken };
