const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const mailOptions = {
  from: process.env.NODEMAILER_USER,
  to: process.env.NODEMAILER_ADMINS,
};

module.exports = { transporter, mailOptions };
