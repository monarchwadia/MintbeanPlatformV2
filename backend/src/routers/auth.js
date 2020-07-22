const config = require("../utils/config.js");
const { Router } = require("express");
const passport = require("passport");
const Joi = require("@hapi/joi");
const validator = require("../validator");
const { User } = require("../db/models");
const { v4: uuidv4 } = require("uuid");
const { requireAuth } = require("./routers.util");
const { hash, compare, objToBase64 } = require("../utils/encryption");
const { sendResetTokenLink } = require("../services/mailerService");

const TOKEN_EXPIRE_HOURS = 48;

const isValidUserToken = async function(user, token, hrsThreshold) {
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

const authRoute = new Router();

authRoute.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

authRoute.post("/logout", requireAuth, (req, res) => {
  req.logout();
  res.json({ message: "Logged out" });
});

authRoute.post("/reset", async (req, res) => {
  const email = req.body.email;
  // check if user with that email exists
  let user;
  try {
    user = await User.findOne({ where: { email } });
  } catch (e) {
    next(e);
  }
  // if no user, return ambiguous 200
  if (!user) {
    return res.status(200);
  }
  // if user exists: a password reset token is generated.
  const resetToken = uuidv4();

  // The bcrypt of the token is saved on the user object.
  const hashedResetToken = await hash(resetToken);

  user.update({
    reset_token: hashedResetToken,
    reset_token_created_at: new Date()
  });
  // Send link to user's email in the form of a URL: `https://mintbean.io/auth/reset/:data` where data is base64 of {email, token}
  const base64Obj = objToBase64({
    email,
    token: resetToken
  });

  const referer = req.headers.referer;
  sendResetTokenLink(user.email, referer, base64Obj);
  // return ambiguous message
  res.status(200).json({ message: "operation successful" });
});

// check if supplied pw reset token is valid and return user email if true
authRoute.post(
  "/reset/check-token",
  validator.body(
    Joi.object({
      tokenObj: Joi.object({
        email: Joi.string().required(),
        token: Joi.string().required()
      })
    })
  ),
  async (req, res, next) => {
    const { email, token } = req.body.tokenObj;

    let user;
    try {
      user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: "Invalid or expired token." });
      }
    } catch (e) {
      next(e);
    }

    const isValidToken = isValidUserToken(user, token, TOKEN_EXPIRE_HOURS);

    if (isValidToken) {
      console.log("valid!");
      res.status(200).json({ email });
    } else {
      console.log("invalid!");
      res.status(403).json({ err: "Invalid or expired token." });
    }
  }
);

authRoute.post(
  "/reset/new-password",
  validator.body(
    Joi.object({
      tokenObj: Joi.object({
        email: Joi.string().required(),
        password: Joi.string()
          .required()
          .min(8)
          .max(64),
        token: Joi.string().required()
      })
    })
  ),
  async (req, res, next) => {
    const { password, token, email } = req.body.tokenObj;
    // find User
    let user;
    try {
      user = await User.findOne({ where: { email } });
    } catch (e) {
      next(e);
    }
    if (!user) {
      return res.status(403).json({ err: "Invalid token" });
    }
    // confirm token
    const isValidToken = await isValidUserToken(
      user,
      token,
      TOKEN_EXPIRE_HOURS
    );
    if (isValidToken) {
      // hash & update pw
      const hashedPassword = await hash(password);

      user.update({
        password_hash: hashedPassword,
        reset_token: null,
        reset_token_created_at: null
      });
      res.status(200).json({
        message: "Password update successful"
      });
    } else {
      res.status(403).json({
        err: "Invalid token"
      });
    }
  }
);

authRoute.post(
  "/register",
  validator.body(
    Joi.object({
      email: Joi.string()
        .required()
        .min(8)
        .max(32),
      password: Joi.string()
        .required()
        .min(8)
        .max(64),
      firstname: Joi.string()
        .required()
        .max(255),
      lastname: Joi.string()
        .required()
        .max(255)
    })
  ),
  async (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.status(400).json({
        err: "Registration failed - already signed in ",
        message:
          "Registration failed: You are already signed in. Try signing out first."
      });
    }

    const { email, password, firstname, lastname } = req.body;
    const isAdmin = false; // just being defensive

    let user;
    try {
      user = await User.findOne({ where: { email } });
    } catch (e) {
      next(e);
    }

    if (user) {
      return res
        .status(422)
        .json({ message: "User with that email address already exists" });
    }

    try {
      user = await User.create({
        email,
        password_hash: password,
        firstname,
        lastname,
        isAdmin
      });
    } catch (e) {
      next(e);
    }

    req.login(user, err => {
      if (err) {
        next(err);
      } else {
        return res.json(user);
      }
    });
  }
);

authRoute.get("/self", requireAuth, (req, res) => res.json(req.user));

module.exports = authRoute;
