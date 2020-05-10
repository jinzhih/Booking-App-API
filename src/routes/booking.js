const express = require('express');
const { addBooking, getBooking, getAllBooking, updateBooking, deleteBooking } = require('../controllers/booking');
const { upload } = require('../controllers/upload');
const adminGuard = require("../middleware/adminGuard");
const authGuard = require("../middleware/authGuard");
const router = express.Router();

router.post('/', addBooking);
router.get('/', getAllBooking);  // admin only
router.get('/:id', getBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);
router.post('/upload', upload);

module.exports = router;