const nodemailer = require('nodemailer');
const config = require('./config');

const transporter = nodemailer.createTransport(config);

const message = {
  from: "gaarahan@foxmail.com",
  to: "gaarahan123@gmail.com",
  subject: "Message title",
  text: "Plaintext version of the message",
};

transporter.sendMail(message, (err, info) => {
  if (err) {
    console.log(err)
  } else {
    console.log(info)
  }
})
