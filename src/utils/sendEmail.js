const nodemailer = require('nodemailer');
const moment = require('moment');

const { EMAIL_HOST, EMAIL_PORT, EMAIL_ACCOUNT, EMAIL_PASSWORD } = process.env;

async function sendEmail(user, booking) {
    let { email, firstName, lastName } = user;
    const { bookingDate, bookingNum, type } = booking;
    const date = moment(bookingDate).format('MMMM Do YYYY, h:mm a');
    // TODO remove testing data
    email = 'liachenxiexu@gmail.com';
    let transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: EMAIL_ACCOUNT,
            pass: EMAIL_PASSWORD,
        },
    });

    if (type === 'Online') {
        const info = await transporter.sendMail({
            from: `"AIBT Team 👻" <${EMAIL_ACCOUNT}>`, // sender address
            to: email, // list of receivers
            subject: `Your Next AIBT Consultation Appointment #${bookingNum}`, // Subject line
            text: `Hi ${firstName} ${lastName}, Just a friendly reminder that you have successfully booked an online consultation.`, // plain text body
            html: `<h5>Hi ${firstName} ${lastName},</h5><br><p>Just a friendly reminder that you have successfully booked an online consultation.</p>`, // html body
        });
    } else {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: `"AIBT Team 👻" <${EMAIL_ACCOUNT}>`, // sender address
            to: email, // list of receivers
            subject: `Your Next AIBT Consultation Appointment #${bookingNum}`, // Subject line
            text: `Hi ${firstName} ${lastName}, Just a friendly reminder that your next appointment at AIBT is coming up on .`, // plain text body
            html: `<h5>Hi ${firstName} ${lastName},</h5><br><p>Hi ${firstName}, Just a friendly reminder that your next appointment at AIBT is coming up on ${date}.</p>`, // html body
        });
    }

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = sendEmail;
