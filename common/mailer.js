
const nodemailer = require("nodemailer")

const sendMAIL = (from, to, subject, text, html) => {
    return new Promise((resolve, reject) => {

        nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        }).sendMail({
            from,
            to,
            subject,
            text,
            html
        }, (err, info) => {
            if (err) {
                reject("smtp failed to connect to mail server")
            }
            resolve("successfully sent")
        })
    })

}
module.exports = {
    sendMAIL
}