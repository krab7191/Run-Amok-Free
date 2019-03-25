const nodemailer = require("nodemailer");

const user_email = process.env.USER_EMAIL;
const user_pwd = process.env.USER_PWD;

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
      user: user_email,
      pass: user_pwd
  }
});

module.exports = smtpTransport;