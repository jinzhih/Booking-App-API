const Log = require('../models/log');
const Booking = require('../models/booking');
const mongoose = require("mongoose");

async function addLog(req, res) {
    let {
        bookingId,
        staffId,
        logRecords
    } = req.body;
    console.log(logRecords);
    // trans authorId type from string to ObjectId
    
    if (!logRecords ) {
        return res.status(404).json('logRecords not found');
    }
  
    // trans bookingId, studentId type from string to ObjectId
    bookingId = mongoose.Types.ObjectId(bookingId);
    staffId = mongoose.Types.ObjectId(staffId);

    const log = new Log({
        bookingId,
        staffId,
        logRecords
    });
    await log.save();

    const booking = await Booking.findById(bookingId).exec();
    booking.logs = log._id;
    await booking.save();
    console.log(log); 
    return res.json(log);
}



module.exports = { addLog };