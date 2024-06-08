

// emailMiddleware.js
const nodemailer = require('nodemailer');

// Create a transporter object using the provided SMTP transport

// Create a transporter object using the provided SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com', // Replace with your SMTP host
  port: 465, // Replace with your SMTP port
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'test@creativerays.com', // Replace with your email address
    pass: 'M@rs!n333' // Replace with your email password
  }
});

// Middleware function to send an email
const sendEmail = (mailOptions, res) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    console.log('Message sent:', info.messageId);
    res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
  });
};

module.exports = sendEmail;


// // emailMiddleware.js
// const nodemailer = require('nodemailer');

// // Create a transporter object using the default SMTP transport
// const transporter = nodemailer.createTransport({
//     service: 'gmail', // e.g., 'gmail', 'yahoo', 'hotmail', etc.
//     auth: {
//         user: 'your-email@gmail.com', // your email
//         pass: 'your-email-password' // your email password
//     }
// });

// // Middleware function to send an email
// const sendEmail = (req, res, next) => {
//     const { to, subject, text, html } = req.body;

//     // Mail options
//     const mailOptions = {
//         from: 'your-email@gmail.com',
//         to: to,
//         subject: subject,
//         text: text,
//         html: html
//     };

//     // Send mail
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log('Error sending email:', error);
//             return res.status(500).json({ error: 'Failed to send email' });
//         }
//         console.log('Email sent:', info.response);
//         res.status(200).json({ message: 'Email sent successfully' });
//     });
// };

// module.exports = sendEmail;


