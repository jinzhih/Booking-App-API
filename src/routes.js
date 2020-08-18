const express = require('express');
const userRouter = require('./routes/user');
const bookingRouter = require('./routes/booking');
const chatRouter = require('./routes/chat');
const sessionRouter = require('./routes/session');
const authRoute = require("./routes/auth");
const authGuard = require('./middleware/authGuard');
const router = express.Router();

router.use("/auth", authRoute);
router.use('/users', authGuard, userRouter);
//router.use('/users',  userRouter);
router.use('/bookings', bookingRouter);
router.use('/chats', authGuard, chatRouter);
router.use('/sessions', authGuard, sessionRouter);


module.exports = router;