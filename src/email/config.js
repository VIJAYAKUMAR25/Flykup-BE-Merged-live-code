import nodemailer from 'nodemailer';

// Create transporter
export const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 587, // Use 587 if TLS is required
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.HOSTINGER_EMAIL,
    pass: process.env.HOSTINGER_PASSWORD
  },
});

// Email options
export const mailOptions = {
  from: process.env.HOSTINGER_EMAIL,
  to: "",
  subject: "Test Email from Hostinger SMTP",
  text: "Hello! This is a test email sent using Hostinger SMTP and Nodemailer.",
};
