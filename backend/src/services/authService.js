const UserDao = require("../daos/UserDao");
const { v4: uuidv4 } = require("uuid");
const { hash, compare, objToBase64 } = require("../utils/encryption");
const {
  sendResetTokenLink,
  sendWelcomeMessage
} = require("../services/mailerService");

// QUERYING SERVICES ***************************

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

module.exports = { sendResetEmail };
