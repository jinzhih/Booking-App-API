const express = require('express');
const { addSession, getSession, updateSession, deleteSession } = require('../controllers/session');
const adminGuard = require('../middleware/adminGuard');
const authGuard = require('../middleware/authGuard');
const router = express.Router();

router.post('/', addSession);
router.get('/', getSession);
router.put('/:id', updateSession);
router.delete('/', deleteSession);

module.exports = router;