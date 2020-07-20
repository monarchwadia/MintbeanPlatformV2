const config = require("../utils/config.js");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

// Configure Nodemailer SendGrid Transporter
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_user: config.sendgridUsername(),
      api_key: config.sendgridKey()
    }
  })
);

const send = function(mailObj) {
  console.log(transporter.sendgrid);
  // sample mail Obj:
  //   {
  //   to: <to_email@domain.com>,
  //   from: <from_email@domain.com>, // Totally up to you
  //   subject: <email_subject>,
  //   html: <html_body>,             // For sending HTML emails
  // }
  transporter.sendgrid.send(mailObj, (err, res) => {
    if (err) {
      return { error: err };
    } else {
      return res;
    }
  });
};

const sendResetTokenLink = function(email, token) {
  const mailObj = {
    to: email,
    from: "mintbean@mintbean.io", // TODO: use correct sender address
    subject: "Reset your Mintbean password",
    html: `
    <p>Hello,</p>
    <p>A password reset was requested for the Mintbean account with this email address.</p>
    <p>Please click the link below to reset your password.</p>
    <a style="${BUTTON_STYLE}" href="https://mintbean.io/auth/reset/${token}"></a>
    `
  };
  return send(mailObj);
};

module.exports = {
  send,
  sendResetTokenLink
};

const BUTTON_STYLE = `
color: white;
padding: 2rem;
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
