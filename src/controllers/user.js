const User = require('../models/user');
const Booking = require('../models/booking');
const { generateToken } = require('../utils/jwt');

async function addUser(req, res) {
    const {
        firstName,
        lastName,
        email,
        password,
        userType,
        campus,
        gender,
        phone,
        bookings,
        disableDate,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json('User already exist');
    }
    // Test Only
    const user = new User({
        firstName: 'Harry',
        lastName: 'Gorden',
        email: 'test2@test.com',
        studentId: '315623',
        userType: 'student',
        campus: 'hobart',
        password: 'test999',
        gender: 'male',
        phone: '4568455465',
        disableDate: null,
    });
    await user.hashPassword();
    await user.save();
    const token = generateToken(user._id, user.userType);
    return res.json({ email, token });
}

//GET /api/users/:id/bookings
async function getAllBookingsByUserId(req, res) {
    const { id: userId } = req.params;
    const bookings = await Booking.find({ userId })
        .populate('chats', 'id chatRecords')
        .populate('userId', 'firstName lastName')
        .exec();
    return res.json(bookings);
}

module.exports = { addUser, getAllBookingsByUserId };
