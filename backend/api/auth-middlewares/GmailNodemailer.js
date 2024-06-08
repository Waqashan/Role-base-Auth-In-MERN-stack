const nodemailer = require('nodemailer');

// Create a transporter object using Gmail SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'waqaskhan26394@gmail.com', // Replace with your Gmail address
    pass: 'alir ejsf xjrt szjb' // Replace with your Gmail password or app-specific password
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
