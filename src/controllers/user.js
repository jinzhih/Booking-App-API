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
        firstName: 'Staff',
        lastName: 'Pop',
        email: 'admin@test.com',
        studentId: '315623',
        userType: 'admin',
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

async function getUser(req, res) {
    const { id } = req.params;
    //TODO may need to update set data later
    const user = await User.findById(id, 'firstName lastName userType email studentId campus phone gender disableDate')
        .exec();

    if (!user) {
        return res.status(404).json('user not found');
    }

    return res.json(user);
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

module.exports = { addUser, getUser, getAllBookingsByUserId };
