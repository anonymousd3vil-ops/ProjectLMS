import nodemailer from "nodemailer";
import {MailtrapTransport} from "mailtrap";
import e from "express";

//async..await is not allowed in global scope, must be wrapper

const sendEmail = async function (email, subject, message) {
  //create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport(
    MailtrapTransport({
      token: process.env.MAILTRAP_TRANSPORT_TOKEN,
    }),
  );

  //send email with defined transport object
  const sender = {
    address: "hello@demomailtrap.co",
    name: "Project LMS",
  };

  const recipients = email;

  transporter
    .sendMail({
      from: sender,
      to: recipients,
      subject: subject,
      text: message,
      category: "Password Reset Email",
    })
    .then(console.log, console.error);
};

export default sendEmail;
