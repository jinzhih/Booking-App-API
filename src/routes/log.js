const express = require('express');
const {
    addLog,

} = require('../controllers/log');
const authGuard = require("../middleware/authGuard");
const router = express.Router();

router.post('/', addLog);


module.exports = router;