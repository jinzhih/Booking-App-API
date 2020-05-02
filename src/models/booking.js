const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    campus: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    attachment: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'processing'
    },
    chats: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    __v: {
        type: Number,
        select: false
    }

}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    id: false
})

const model =mongoose.model('Booking', schema);

module.exports = model;