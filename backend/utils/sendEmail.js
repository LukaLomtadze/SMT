import dotenv from "dotenv"
import nodemailer from "nodemailer";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_NAME,
        pass: process.env.GMAIL_PASS
    }
});

const mailOptions = (toEmail, verificationTokenT) => ({
    from: process.env.GMAIL_NAME,
    to: toEmail,
    subject: "Please Verify your email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("verificationCode", verificationTokenT)
});

export const sendEmail = (toEmail, verificationTokenT) => {
    transporter.sendMail(mailOptions(toEmail, verificationTokenT), (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
};
