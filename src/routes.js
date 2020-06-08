const express = require('express');
const userRouter = require('./routes/user');
const bookingRouter = require('./routes/booking');
const chatRouter = require('./routes/chat');
const sessionRouter = require('./routes/session');
const authRoute = require("./routes/auth");
const authGuard = require('./middleware/authGuard');
const adminGuard = require("./middleware/adminGuard");
const router = express.Router();

//TODO add auth middleware when production

router.use("/auth", authRoute);
router.use('/users', userRouter);
router.use('/bookings', bookingRouter);
router.use('/chats', chatRouter);
router.use('/sessions', sessionRouter);


module.exports = router;