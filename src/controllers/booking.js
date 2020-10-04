const Booking = require('../models/booking');
const User = require('../models/user');
const Chat = require('../models/chat');
const Session = require('../models/session');
const sendEmail = require('../utils/sendEmail');
const moment = require('moment');
const { genBookingNum } = require('../utils/gen');
const { BOOKING_TYPE, OFFLINE_BOOKING_STATUS } = require('../constants/option');

async function addBooking(req, res) {
    const {
        type,
        campus,
        userId,
        topic,
        subject,
        content,
        bookingDate,
        bookingTime,
        attachment,
        status,
    } = req.body;
    console.log(attachment); 
    const bookingNum = genBookingNum(campus);
    const booking = new Booking({
        type,
        campus,
        userId,
        topic,
        subject,
        content,
        bookingDate,
        bookingTime,
        attachment,
        status,
        bookingNum,
    });
    await booking.save();

    const user = await User.findById(userId).exec();
    user.bookings.addToSet(booking._id);
    await user.save();
    // Send email
    sendEmail(user, booking);
    // Disable the relative session
    if(type === BOOKING_TYPE.OFFLINE) {
        const dateString = moment(bookingDate).format('YYYY-MM-DD');
        const session = await Session.findOne(
            { date: dateString, campus: campus },
        ).exec();
        session.time.pull(bookingTime);
        await session.save();
    }

    return res.json(booking);
}

// async function getBooking(req, res) {
//     console.log('1');
//     const { id } = req.params;

//     const booking = await Booking.findById(id)
//         .populate('chats', 'id chatRecords')
//         .populate('userId', 'firstName lastName studentId email campus phone gender')
//         .exec();

//     if (!booking) {
//         return res.status(404).json('booking not found');
//     }
//     //return bookings
//     const { type } = req.query;

//     let bookings = [];
//     // if query param exist, then return all booked offline booking
//     if (type === BOOKING_TYPE.OFFLINE) {
//         bookings = await Booking.find(
//             { type: type },
//             { attachment: 0, chats: 0, createdAt: 0, updatedAt: 0 }
//         )
//             .populate('userId', 'firstName lastName studentId')
//             .exec();
//     } else {
//         bookings = await Booking.find(
//             {},
//             { content: 0, attachment: 0, createdAt: 0, updatedAt: 0 }
//         )
//             .populate('userId', 'firstName lastName studentId')
//             .exec();
//     }

//     if (!bookings) {
//         return res.status(404).json('booking not found');
//     }

//     console.log(bookings);
//     console.log(booking);
//     //return res.json(booking);
//     return res.json({ booking, bookings });
// }

async function getBooking(req, res) {
    const { id } = req.params;
    const booking = await Booking.findById(id)
        .populate('chats', 'id chatRecords')
        .populate('userId', 'firstName lastName studentId email campus phone gender')
        .exec();

    if (!booking) {
        return res.status(404).json('booking not found');
    }
    
    return res.json(booking);
   
}


async function getAllBooking(req, res) {
    const { type } = req.query;

    let bookings = [];
    // if query param exist, then return all booked offline booking
    if (type === BOOKING_TYPE.OFFLINE) {
        bookings = await Booking.find(
            { type: type },
            { attachment: 0, chats: 0, createdAt: 0, updatedAt: 0 }
        )
            .populate('userId', 'firstName lastName studentId')
            .exec();
    } else {
        bookings = await Booking.find(
            {},
            { content: 0, attachment: 0, createdAt: 0, updatedAt: 0 }
        )
            .populate('userId', 'firstName lastName studentId')
            .exec();
    }

    if (!bookings) {
        return res.status(404).json('booking not found');
    }

    // Check and change offline booking status if the bookingtime expired 
    bookings.map((booking) => {
        let { _id, type, bookingDate, status } = booking;
        const now = new Date().getTime();
        const time = new Date(bookingDate).getTime();
        const isExpired = now - time > 0;
        if (type === BOOKING_TYPE.OFFLINE && isExpired && (status != OFFLINE_BOOKING_STATUS.FINISHED)) {
            Booking.findByIdAndUpdate(
                _id,
                {
                    status: OFFLINE_BOOKING_STATUS.FINISHED,
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
    )
    .populate('userId','firstName lastName studentId email campus phone gender')
    .exec();

    if (!newBooking) {
        return res.status(404).json('booking not found');
    }
    
    // Disable the relative session
    if(status === OFFLINE_BOOKING_STATUS.CANCELED) {
        const dateString = moment(newBooking.bookingDate).format('YYYY-MM-DD');
        const session = await Session.findOne(
            { date: dateString, campus: newBooking.campus },
        ).exec();
        session.time.addToSet(newBooking.bookingTime);
        await session.save();
    }

        bookings = await Booking.find(
        {},
        { content: 0, attachment: 0, createdAt: 0, updatedAt: 0 }
    )
        .populate('userId', 'firstName lastName studentId')
        .exec();
    console.log(bookings);
    if (!bookings) {
        return res.status(404).json('booking not found');
    }

    //return res.json(newBooking);
    return res.json({ newBooking, bookings });
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
