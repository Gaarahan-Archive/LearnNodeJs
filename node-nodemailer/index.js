const nodemailer = require('nodemailer');
const config = require('config');

const transporter = nodemailer.createTransport(config);

transporter.sendMail(data, (err, info) => {
  if (err) {
    console.log(err)
  } else {
    console.log(info)
  }
})
