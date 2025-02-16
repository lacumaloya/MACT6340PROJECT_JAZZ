import nodemailer from "nodemailer";

export async function sendMessage(sub, txt) {
    let transporter = nodemailer.createTransport({
        host: process.env.GMAIL_HOST,
        port: process.env.MAIL_PORT, // Should be 587 for TLS
        secure: false, // Should be false for TLS (not SSL)
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
        },
        requireTLS: process.env.MAIL_TLS === "true", // Ensure TLS is required
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
        console.log("Message not sent - " + err);
        throw err;  // Re-throwing error
    }
}
