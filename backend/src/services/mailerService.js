const config = require("../utils/config.js");
const sgMail = require("@sendgrid/mail");

const SENDER_EMAIL = "claire.froelich@mintbean.io"; // TODO: use correct sender address

sgMail.setApiKey(config.sendgridKey());

const send = function(mailObj) {
  // sample mail Obj:
  //   {
  //   to: <to_email@domain.com>,
  //   from: <from_email@domain.com>, // Totally up to you
  //   subject: <email_subject>,
  //   html: <html_body>,             // For sending HTML emails
  // }
  sgMail.send(mailObj).catch(err => console.log(err.response.body.errors));
};

const sendResetTokenLink = function(email, data) {
  console.log(config.sendgridKey());
  const mailObj = {
    to: email,
    from: SENDER_EMAIL,
    subject: "Reset your Mintbean password",
    html: `
    <p>Hello,</p>
    <p>A password reset was requested for the Mintbean account with this email address.</p>
    <p>Please click the link below to reset your password.</p>
    <a style="${BUTTON_STYLE}" href="https://mintbean.io/auth/reset/${data}">Create a new password</a>
    `
  };
  return send(mailObj);
};

module.exports = {
  send,
  sendResetTokenLink
};

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
