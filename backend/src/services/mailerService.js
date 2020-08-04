// const sgMail = require("@sendgrid/mail");
const { rootDomain } = require("../utils/config");
const { objToBase64 } = require("../utils/encryption");

const EmailDao = require("../daos/MailerDao");

const MINTBEAN_URL = "https://www.mintbean.io/";
const EVENTBRITE_URL = "https://www.eventbrite.ca/o/mintbean-28752300031";
const BUTTON_STYLE = `
color: #fff;
margin: 1.5rem 0;
padding: .8rem;
box-sizing: content-box;
text-decoration: none;
display: inline-flex;
justify-content: center;
align-items: center;
background: rgb(2, 237, 157);
  background: -moz-linear-gradient(
    175deg,
    rgba(2, 237, 157, 1) 0%,
    rgba(0, 155, 226, 1) 100%
  );
  background: -webkit-linear-gradient(
    175deg,
    rgba(2, 237, 157, 1) 0%,
    rgba(0, 155, 226, 1) 100%
  );
  background: linear-gradient(
    175deg,
    rgba(2, 237, 157, 1) 0%,
    rgba(0, 155, 226, 1) 100%
  );
  `;

// TODOCLAIRE: check if the reset token is working
const sendResetTokenLink = function(email, token) {
  const tokenContainer = objToBase64({ email, token });
  const url = `${rootDomain()}/auth/reset/${tokenContainer}`;
  const mailObj = {
    to: email,
    subject: "Reset your Mintbean password",
    html: `
    <p>Hello,</p>
    <p>A password reset was requested for the Mintbean account with this email address.</p>
    <p>Please click the link below to reset your password.</p>
    <a id="btn_reset_link" href="${url}" style="${BUTTON_STYLE}">Create a new password</a>
    `
  };
  return EmailDao.send(mailObj);
};

const sendWelcomeMessage = function(user, token) {
  const tokenContainer = objToBase64({
    email: user.email,
    firstname: user.firstname,
    token
  });
  const url = `${rootDomain()}/auth/confirm/${tokenContainer}`;

  const mailObj = {
    to: user.email,
    subject: "Confirm your Mintbean account",
    html: `
    <p>Welcome to Mintbean, ${user.firstname}!</p>
    <p>Please click the link below to confirm your new account.</p>
    <a style="${BUTTON_STYLE}" href="${url}">Confirm your new account</a>
    <p>Be sure to check out our <a href="${EVENTBRITE_URL}" rel="noopener noreferrer" target="_blank">upcoming events</a> to get started hacking!</p>
    <p>Mintbean team</p>
    `
  };
  return EmailDao.send(mailObj);
};

module.exports = {
  sendResetTokenLink,
  sendWelcomeMessage
};
