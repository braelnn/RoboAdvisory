const nodemailer = require('nodemailer');
const crypto = require('crypto');

const otpStorage = {}; // Store OTPs temporarily

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ✅ Send Email Function
exports.sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: `"RoboAdvisor" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        });
        console.log(`✅ Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw new Error("Failed to send email");
    }
};