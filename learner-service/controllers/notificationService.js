import nodemailer from 'nodemailer';
import { Vonage } from '@vonage/server-sdk';

export const SendEmail = (userMail) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.email",
        port: 587,
        secure: false,
        auth: {
            user: "dsuse367@gmail.com",
            pass: process.env.APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: {
            name: "Academia",
            address: "dsuse367@gmail.com",
        },
        to: [userMail],
        subject: "Course Enrollment",
        text: "You successfully enrolled to this course",
        html: "<b>You successfully enrolled to this course start Your Learning journey</b>",
    };

    const sendEmail = async (transporter, mailOptions) => {
        try {
            await transporter.sendMail(mailOptions);
            console.log("Email has been sent");
        } catch (error) {
            console.error(error);
        }
    };

    sendEmail(transporter, mailOptions);
};

export const SendSms = (userMobile) => {
    const vonage = new Vonage({
        apiKey: process.env.API_KEY,
        apiSecret: process.env.API_SECRET
    });

    const from = "Vonage APIs";
    const to = userMobile;
    const text = 'You successfully enroll to this course';

    async function sendSMS() {
        try {
            await vonage.sms.send({ to, from, text });
            console.log('Message sent successfully');
        } catch (err) {
            console.error('Error sending SMS:', err);
        }
    }

    sendSMS();
};
