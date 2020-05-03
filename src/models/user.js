const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        validate: {
            validator: (email) => !Joi.string().email().validate(email).error,
            msg: 'Invalid email format',
        },
    },
    password: {
        type: String,
        require: true,
    },
    userType: {
        type: String,
        default: 'student',
    },
    studentId: {
        type: Number
    },
    campus: {
        type: String,
        default: 'Hobart',
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
        },
    ],
    disableDate: [{ type: Date }],
});

schema.methods.hashPassword = async function() {
  this.password = await bcrypt.hash(this.password, 10);
};

schema.methods.validatePassword = async function(password) {
  const validPassword = await bcrypt.compare(password, this.password);
  return validPassword;
};

const model = mongoose.model('User', schema);

module.exports = model;