import dotenv from "dotenv"
import nodemailer from "nodemailer";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL } from "./emailTemplates.js";

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_NAME,
        pass: process.env.GMAIL_PASS
    }
});

const mailOptions = (toEmail, verificationTokenT, userName) => ({
    from: process.env.GMAIL_NAME,
    to: toEmail,
    subject: "Please Verify your email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("verificationCode", verificationTokenT).replace("{userName}", userName)
});


export const sendEmail = (toEmail, verificationTokenT, userName) => {
    transporter.sendMail(mailOptions(toEmail, verificationTokenT, userName), (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
};

const mailOptions2 = (toEmail, userName) => ({
    from: process.env.GMAIL_NAME,
    to: toEmail,
    subject: "Welcome to our website",
    html: WELCOME_EMAIL.replace("{userName}", userName)
});

export const sendWelcomeEmail = (toEmail, userName) => {
    transporter.sendMail(mailOptions2(toEmail, userName), (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
}


const mailOptions3 = (toEmail, route, userName) => ({
    from: process.env.GMAIL_NAME,
    to: toEmail,
    subject: "Reset Password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{userName}", userName).replace("{resetURL}", route)
});


export const sendPasswordResetEmail = (toEmail, route, userName) => {
    transporter.sendMail(mailOptions3(toEmail, route ,userName), (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
}

//PASSWORD_RESET_SUCCESS_TEMPLATE

const mailOptions4 = (toEmail, userName) => ({
    from: process.env.GMAIL_NAME,
    to: toEmail,
    subject: "Reset Password Succsessful",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{userName}", userName)
});


export const sendResetPasswordSuccess = (toEmail, userName) => {
    transporter.sendMail(mailOptions4(toEmail ,userName), (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
}