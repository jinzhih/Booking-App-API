const Log = require('../models/log');
const Booking = require('../models/booking');
const mongoose = require("mongoose");

async function addLog(req, res) {
    let {
        bookingId,
        studentId,
        logRecords
    } = req.body;
    // trans authorId type from string to ObjectId
    const records = [];
    if (!logRecords || !logRecords.length) {
        return res.status(404).json('logRecords not found');
    }
    logRecords.forEach((record) => {
        let { author, content, time } = record;

        author = mongoose.Types.ObjectId(author);
        const item = {
            author,
            content,
            time,
        };
        records.push(item);
    });
    logRecords = records;
    // trans bookingId, studentId type from string to ObjectId
    bookingId = mongoose.Types.ObjectId(bookingId);
    studentId = mongoose.Types.ObjectId(studentId);

    const log = new Log({
        bookingId,
        studentId,
        logRecords
    });
    await log.save();

    const booking = await Booking.findById(bookingId).exec();
    booking.logs = log._id;
    await booking.save();

    return res.json(log);
}



module.exports = { addLog };