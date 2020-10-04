const mongoose = require('mongoose');

// const logRecordsSchema = new mongoose.Schema(
//     {
//         author: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             require: true,
//         },
//         content: {
//             type: String,
//             require: true,
//         },
//         time: {
//             type: Date,
//             require: true,
//         },
//     },
//     {
//         _id: false,
//     }
// );

const schema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        require: true,
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    logRecords: {
        type: String,

    },
});

const model = mongoose.model('Log', schema);

module.exports = model;
