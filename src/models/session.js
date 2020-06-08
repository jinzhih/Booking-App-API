const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        __v: {
            type: Number,
            select: false,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const model = mongoose.model('Session', schema);

module.exports = model;