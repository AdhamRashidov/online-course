import { createTransport } from "nodemailer";
import config from '../config/index.js';

export const sendOTPToMail = (mail, otp) => {
    const transporter = createTransport({
        // port: config.MAIL.PORT,
        // host: config.MAIL.HOST,
        service: 'Gmail',
        auth: {
            user: config.MAIL.USER,
            pass: config.MAIL.PASS
        },
        secure: true
    });
    const mailOptions = {
        from: config.MAIL.USER,
        to: mail,
        subject: 'Adham online_course',
        text: otp
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}