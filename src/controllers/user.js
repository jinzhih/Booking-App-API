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
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json('User already exist');
    }
    // Test Only
    const user = new User({
        firstName: 'Student2',
        lastName: 'Smith',
        email: 'test1@test.com',
        studentId: '054828',
        userType: 'student',
        campus: 'sydney',
        password: 'test999',
        gender: 'female',
        phone: '0666 666 666',
    });
    await user.hashPassword();
    await user.save();
    const token = generateToken(user._id, user.userType);
    return res.json({ email, token });
}

async function getUser(req, res) {
    const { id } = req.params;
    //TODO may need to update set data later
    const user = await User.findById(id, 'firstName lastName userType email campus phone gender disableDate studentId')
        .exec();
    console.log(user);

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
        .populate('userId', 'firstName lastName studentId')
        .exec();
       
    return res.json(bookings);
}

module.exports = { addUser, getUser, getAllBookingsByUserId };
