const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cryptocurrencymarketsimulation@gmail.com',
    pass: '',
  },
});

const mailOptions = {
  from: 'vindication@enron.com',
  to: 'friendsofenron@gmail.com, enemiesofenron@gmail.com',
  subject: 'Invoices due',
  text: 'Dudes, we really need your money.',
};

// const main = async () => {
//   let testAccount = await nodemailer.createTestAccount();

// //   let info = await transporter.sendMail({
// //     from: '"Fred Foo 👻" <foo@example.com>',
// //     to: 'remigiusz18032@gmail.com',
// //     subject: 'Hello ✔',
// //     text: 'Hello world?',
// //     html: '<b>Hello world?</b>',
// //   });

//   console.log('Message sent: %s', info.messageId);
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// };

main().catch(console.error);
