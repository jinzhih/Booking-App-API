const express = require('express');
const { addSession, getAllSession, deleteSession } = require('../controllers/session');
const adminGuard = require("../middleware/adminGuard");
const authGuard = require("../middleware/authGuard");
const router = express.Router();

router.post('/', addSession);
router.get('/', getAllSession);
router.delete("/:id", deleteSession);

module.exports = router;