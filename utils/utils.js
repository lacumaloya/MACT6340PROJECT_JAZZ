import nodemailer from "nodemailer";

export async function sendMessage(sub, txt) {
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE === 'true', // Convert string to boolean
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let message = {
        from: process.env.MESSAGE_FROM,
        to: process.env.MESSAGE_TO,
        subject: sub,
        text: txt,
    };

    try {
        await transporter.sendMail(message);
        console.log("Message sent");
    } catch (err) {
        console.error("Message not sent - " + err);
        throw err;  // Re-throwing error to handle it in higher-level code if necessary
    }
}
