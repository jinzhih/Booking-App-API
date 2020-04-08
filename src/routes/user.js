const express = require('express');
const { addUser, getAllBookingsByUserId } = require('../controllers/user');
const adminGuard = require("../middleware/adminGuard");
const authGuard = require("../middleware/authGuard");
const router = express.Router();

router.post('/', addUser);
router.get("/:id/bookings", getAllBookingsByUserId);

module.exports = router;