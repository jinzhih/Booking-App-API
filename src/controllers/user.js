const User = require('../models/user');
const Booking = require('../models/booking');
const { generateToken } = require("../utils/jwt");

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
        disableDate
    } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json("User already exist");
    }
    const user = new User({
        firstName: 'Teacher',
        lastName: 'Bob',
        email: 'admin@test.com',
        userType: 'admin',
        campus: 'hobart',
        password: 'test999',
        gender: 'male',
        phone: '666666666',
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