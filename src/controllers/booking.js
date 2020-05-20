const Booking = require('../models/booking');
const User = require('../models/user');
const Chat = require('../models/chat');
const sendEmail = require('../utils/sendEmail');
const { genBookingNum } = require('../utils/gen');

async function addBooking(req, res) {
    const {
        type,
        campus,
        userId,
        topic,
        subject,
        content,
        bookingDate,
        attachment,
        status,
    } = req.body;

    const bookingNum = genBookingNum(campus);
    const booking = new Booking({
        type,
        campus,
        userId,
        topic,
        subject,
        content,
        bookingDate,
        attachment,
        status,
        bookingNum,
    });
    await booking.save();

    const user = await User.findById(userId).exec();
    user.bookings.addToSet(booking._id);
    let userEmail = user.email;
    await user.save();
    userEmail = 'liachenxiexu@gmail.com';
    // Send email
    sendEmail(user, booking);

    return res.json(booking);
}

async function getBooking(req, res) {
    const { id } = req.params;

    const booking = await Booking.findById(id)
        .populate('chats', 'id chatRecords')
        .populate('userId', 'firstName lastName studentId')
        .exec();

    if (!booking) {
        return res.status(404).json('booking not found');
    }

    return res.json(booking);
}

async function getAllBooking(req, res) {
    const bookings = await Booking.find(
        {},
        { content: 0, attachment: 0, createdAt: 0, updatedAt: 0 }
    )
        .populate('userId', 'firstName lastName studentId')
        .exec();

    if (!bookings) {
        return res.status(404).json('booking not found');
    }

    // Check and change offline booking status if the bookingtime expired 
    bookings.map((booking) => {
        let { _id, type, bookingDate, status } = booking;
        const now = new Date().getTime();
        const time = new Date(bookingDate).getTime();
        const isExpired = now - time > 0;
        if (type === 'Offline' && isExpired && (status != 'finished')) {
            Booking.findByIdAndUpdate(
                _id,
                {
                    status: 'finished',
                },
                {
                    new: true,
                }
            ).exec();
        } 
    });


    return res.json(bookings);
}
// update booking info
async function updateBooking(req, res) {
    const { id } = req.params;
    const { topic, subject, content, bookingDate, attachment } = req.body;
    const newBooking = await Booking.findByIdAndUpdate(
        id,
        {
            topic,
            subject,
            content,
            bookingDate,
            attachment,
        },
        {
            new: true,
        }
    ).exec();

    if (!newBooking) {
        return res.status(404).json('booking not found');
    }

    return res.json(newBooking);
}
// update booking status only, when confirmed or finished
async function updateBookingStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const newBooking = await Booking.findByIdAndUpdate(
        id,
        {
            status,
        },
        {
            new: true,
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

module.exports = {
    addBooking,
    getBooking,
    getAllBooking,
    updateBooking,
    deleteBooking,
    updateBookingStatus,
};
