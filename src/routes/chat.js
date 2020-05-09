const express = require('express');
const {
    addChat,
    updateChat,
    getAllChatByBookingId,
} = require('../controllers/chat');
const authGuard = require("../middleware/authGuard");
const router = express.Router();

router.post('/', addChat);
router.put('/:id', updateChat);
router.get('/', getAllChatByBookingId);

module.exports = router;