const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
        },
        time: [{
            type: String,
            required: true,
        }],
        campus: {
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