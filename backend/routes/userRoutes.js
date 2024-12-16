const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getUserProfile } = require('../controllers/userController');

// GET /api/users/profile (Protected Route)
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
