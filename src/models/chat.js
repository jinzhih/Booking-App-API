const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        require: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    counselorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    chatRecords: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        content: {
            type: String,
            require: true
        },
        time: {
            type: Date,
            require: true
        }
    }]
});

const model = mongoose.model('Chat', schema);

module.exports = model;