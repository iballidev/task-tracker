const nodemailer = require("nodemailer");
const config = require("../../../config/env");

function Nodemailer({ ...payload }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // user: config.MAILER_EMAIL,
      // pass: config.MAILER_PASSWORD
      user: "iballi2017@gmail.com",
      // pass: "hymi ivvh cvzc utgk"
      pass: "drbg fere cdcy bzqq"
    }
  });

  const mailOptions = {
    from: payload?.user_name
      ? `${payload?.user_name} <${payload?.from}>`
      : payload?.from,
    to: payload?.to,
    subject: payload?.subject,
    text: payload?.text
  };

  this.send_mail = () => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("ERROR***: ", error);
        return res.send("Error: " + error);
      } else {
        console.log("Email sent: " + info.response);
        res.send("Email sent: " + info.response);
      }
    });
    return true;
  };
}

module.exports = Nodemailer;
