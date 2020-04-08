const express = require('express');
const userRouter = require('./routes/user');
const bookingRouter = require('./routes/booking');
const chatRouter = require('./routes/chat');
const authRoute = require("./routes/auth");
const authGuard = require('./middleware/authGuard');
const adminGuard = require("./middleware/adminGuard");
const router = express.Router();

router.use("/auth", authRoute);
router.use('/users', userRouter);
router.use('/bookings', bookingRouter);
router.use('/chats', chatRouter);

module.exports = router;