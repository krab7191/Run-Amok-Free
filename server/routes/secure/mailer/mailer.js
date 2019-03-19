const nodemailer = require("nodemailer");

const user_email = "";
const user_pwd = "";

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
      user: user_email,
      pass: user_pwd
  }
});

module.exports = smtpTransport;