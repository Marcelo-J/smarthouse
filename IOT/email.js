import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ndehtaminang@gmail.com',
    pass: 'gcrrxogxnhkbymzh'
  }
});

const mailOptions = {
  from: '"Smart Home" <ndehtaminang@gmail.com>',
  to: 'ndehtaminang246@example.com',
  subject: 'Test Alert from Smart Home',
  text: 'Your home system has a new notification!'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error(error);
  }
  console.log('Email sent: ' + info.response);
});
