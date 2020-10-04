const express = require('express');
const { addBooking, getBooking, getAllBooking, updateBooking, updateBookingStatus, deleteBooking } = require('../controllers/booking');
const { upload } = require('../controllers/upload');
const adminGuard = require("../middleware/adminGuard");
const authGuard = require("../middleware/authGuard");
const router = express.Router();

router.post('/', authGuard, addBooking);
router.get('/', authGuard, adminGuard, getAllBooking);
router.get('/:id', authGuard, getBooking);

router.put('/:id', authGuard, updateBooking);
router.patch('/:id', authGuard, updateBookingStatus);
router.delete('/:id', authGuard, deleteBooking);
router.post('/upload', upload);

module.exports = router;