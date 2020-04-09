const nodemailer = require("nodemailer");

async function sendEmail(user, booking) {
    let { email, firstName } = user;
    const { bookingDate } = booking;
    email = "liachenxiexu@gmail.com";
    let transporter = nodemailer.createTransport({
        host: "smtp.163.com",
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "lia_chenxiexu@163.com",
            pass: "LDGPOIDQMTHSXHNS"
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"AIBT Team 👻" <lia_chenxiexu@163.com>', // sender address
        to: email, // list of receivers
        subject: "Your Next AIBT Consultation Appointment", // Subject line
        text: `Hi ${firstName}, Just a friendly reminder that your next appointment at AIBT is coming up on .`, // plain text body
        html: `<b>Hi ${firstName}, Just a friendly reminder that your next appointment at AIBT is coming up on .</b>` // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}

module.exports = sendEmail;