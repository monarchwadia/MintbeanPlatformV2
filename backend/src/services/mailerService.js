const config = require("../utils/config.js");
const sgMail = require("@sendgrid/mail");
const { rootDomain } = require('../utils/config');

const SENDER_EMAIL = "claire.froelich@mintbean.io"; // TODO: use correct sender address
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


sgMail.setApiKey(config.sendgridKey());

const send = function(mailObj) {
  // sample mail Obj:
  //   {
  //   to: <to_email@domain.com>,
  //   from: <from_email@domain.com>, // Totally up to you
  //   subject: <email_subject>,
  //   html: <html_body>,             // For sending HTML emails
  // }
  return sgMail.send(mailObj)
    .catch(err => console.log("ERROR when using sgMail.send()", err.response.body.errors));
};

// TODOCLAIRE: check if the reset token is working
const sendResetTokenLink = function(email, tokenContainer) {
  const mailObj = {
    to: email,
    from: SENDER_EMAIL,
    subject: "Reset your Mintbean password",
    html: `
    <p>Hello,</p>
    <p>A password reset was requested for the Mintbean account with this email address.</p>
    <p>Please click the link below to reset your password.</p>
    <a style="${BUTTON_STYLE}" href="${rootDomain()}/reset/${tokenContainer}">Create a new password</a>
    `
  };
  return send(mailObj);
};
const sendWelcomeMessage = function(user) {
  const mailObj = {
    to: user.email,
    from: SENDER_EMAIL,
    subject: "Confirm your Mintbean account",
    html: `
    <p>Welcome to Mintbean, ${user.firstname}!</p>
    <p>Please click the link below to confirm your new account.</p>
    <a style="${BUTTON_STYLE}" href="${MINTBEAN_URL}">Confirm your new account</a>
    <p>Be sure to check out our <a href="${EVENTBRITE_URL} rel="noopener noreferrer" target="_blank">upcoming events</a> to get started hacking!</p>
    <p>Mintbean team</p>
    `
  };
  return send(mailObj);
};

module.exports = {
  send,
  sendResetTokenLink,
  sendWelcomeMessage
};
