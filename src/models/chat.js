const mongoose = require('mongoose');

const chatRecordsSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
        time: {
            type: Date,
            require: true,
        },
    },
    {
        _id: false,
    }
);

const schema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        require: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    chatRecords: [chatRecordsSchema],
});

const model = mongoose.model('Chat', schema);

module.exports = model;
