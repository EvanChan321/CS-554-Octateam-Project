const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllGames, addGameComment } = require('../controllers/gameController');

// GET /api/games (Public route)
router.get('/', getAllGames);

// POST /api/games/:gameId/comment (Protected route)
router.post('/:gameId/comment', authMiddleware, addGameComment);

module.exports = router;
