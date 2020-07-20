const { Router } = require("express");
const passport = require("passport");
const Joi = require("@hapi/joi");
const validator = require("../validator");
const { User } = require("../db/models");
const { v4: uuidv4 } = require("uuid");
const { requireAuth } = require("./routers.util");
const { hash, compare } = require("../utils/encryption");

const authRoute = new Router();

authRoute.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

authRoute.post("/logout", requireAuth, (req, res) => {
  req.logout();
  res.json({ message: "Logged out" });
});

authRoute.post("/reset", async (req, res) => {
  console.log(req.body.email);
  const email = req.body.email;
  // check if user with that email exists
  let user;
  try {
    user = await User.findOne({ where: { email } });
  } catch (e) {
    next(e);
  }
  // if false: do nothing
  if (!user) {
    return res.status(200);
  }
  // if true: a password reset token is generated.
  const resetToken = uuidv4();

  // The bcrypt of the token is saved on the user object.
  const hashedResetToken = await hash(resetToken);
  console.log(hashedResetToken);

  // The bcrypt of the token is saved on the user object
  user.update({
    reset_token: hashedResetToken,
    reset_token_created_at: new Date()
  });

  // The token itself is sent to the user's email in the form of a URL: `https://mintbean.io/auth/reset/:tokenId`

  // return ambiguous message
  res.json({ message: "operation successful" });
});

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
