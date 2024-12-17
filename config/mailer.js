const nodemailer = require("nodemailer");
const dbHost = process.env.DB_HOST;
const port = process.env.PORT || 3000;  // Default to 3000 if not specified
require('dotenv').config();



const transporter = nodemailer.createTransport({
  service: "Gmail", // Replace with your email provider
  auth: {
    user: process.env.vedakshethraclinic, // Your email address
    pass: process.env.Veda2024, // Your email password or app-specific password
  },
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (err) {
    console.error("Error sending email:", err.message);
  }
};

module.exports = sendEmail;
