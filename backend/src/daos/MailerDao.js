import sgMail from "@sendgrid/mail";
import c from "../utils/config";

const SENDER_EMAIL = "noreply@mintbean.io"; // TODO: use correct sender address

if (!c.sendgridKey()) {
  throw new Error(
    "The sendgrid api key has not been set in the environment variables"
  );
}

sgMail.setApiKey(c.sendgridKey());

// sample mail Obj:
//   {
//   to: <to_email@domain.com>,
//   from: <from_email@domain.com>, // Totally up to you
//   subject: <email_subject>,
//   html: <html_body>,             // For sending HTML emails
// }
const send = function({ to, subject, html }) {
  const sgMailObj = {
    to,
    subject,
    html,
    from: SENDER_EMAIL
  };
  return sgMail
    .send(sgMailObj)
    .catch(err => console.log("ERROR when using sgMail.send(): ", err));
};

export default {
  send
};
