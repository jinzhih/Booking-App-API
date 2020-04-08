const Booking = require('../models/booking');
const User = require('../models/user');
const Chat = require('../models/chat');
const nodemailer = require("nodemailer");

async function addBooking(req, res) {
    const {
        type,
        campus,
        userId,
        topic,
        subject,
        content,
    } = req.body;

    const booking = new Booking({
        type,
        campus,
        userId,
        topic,
        subject,
        content,
        bookingDate: new Date(),
        attachment: 'attachment'
    });
    await booking.save();

    const user = await User.findById(userId).exec();
    user.bookings.addToSet(booking._id);
    await user.save();

    // Send email
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <liachenxiexu@gmail.com>', // sender address
        to: "lia_chenxiexu@163.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    return res.json(booking);
}

async function getBooking(req, res) {
    const { id } = req.params;

    const booking = await Booking.findById(id).populate('chats', 'id chatRecords');

    if (!booking) {
        return res.status(404).json('booking not found');
    }
    
    return res.json(booking);
}

async function getAllBooking(req, res) {

    const bookings = await Booking.find().populate('chats', 'id chatRecords').exec();

    if (!bookings) {
        return res.status(404).json('booking not found');
    }
    
    return res.json(bookings);
}

async function updateBooking(req, res) {
    const { id } = req.params;
    const {
        topic,
        subject,
        content,
        bookingDate,
        attachment
    } = req.body;

    const newBooking = await Booking.findByIdAndUpdate(
        id,
        {
            topic,
            subject,
            content,
            bookingDate,
            attachment
        },
        {
            new: true
        }
        ).exec();

    if (!newBooking) {
        return res.status(404).json('booking not found');
    }
    
    return res.json(newBooking);
}

async function deleteBooking(req, res) {
    const { id } = req.params;
    const data = await Booking.findById(id).exec();
    const chatId = data.chats;
    const userId = data.userId;
    const booking = await Booking.findByIdAndDelete(id).exec();

    if (!booking) {
        return res.status(404).json('booking not found');
    }
    //delete record from User 
    const user = await User.findById(userId).exec();
    user.bookings.pull(booking._id);
    await user.save();
    //delete related Chat
    await Chat.findByIdAndDelete(chatId).exec();
    

    return res.sendStatus(200);
}


module.exports = { addBooking, getBooking, getAllBooking, updateBooking, deleteBooking };