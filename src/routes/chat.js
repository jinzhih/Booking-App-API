const express = require('express');
const { addChat, updateChat } = require('../controllers/chat');
const authGuard = require("../middleware/authGuard");
const router = express.Router();

router.post('/', addChat);
router.put('/:id', updateChat);

module.exports = router;