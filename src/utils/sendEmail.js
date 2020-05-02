const nodemailer = require("nodemailer");

const { EMAIL_HOST, EMAIL_PORT, EMAIL_ACCOUNT, EMAIL_PASSWORD } = process.env;

async function sendEmail(user, booking) {
    let { email, firstName } = user;
    const { bookingDate } = booking;
    // Test DATA
    email = "liachenxiexu@gmail.com";
    let transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: EMAIL_ACCOUNT,
            pass: EMAIL_PASSWORD
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"AIBT Team 👻" <${EMAIL_ACCOUNT}>`, // sender address
        to: email, // list of receivers
        subject: 'Your Next AIBT Consultation Appointment', // Subject line
        text: `Hi ${firstName}, Just a friendly reminder that your next appointment at AIBT is coming up on .`, // plain text body
        html: `<b>Hi ${firstName}, Just a friendly reminder that your next appointment at AIBT is coming up on .</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}

module.exports = sendEmail;