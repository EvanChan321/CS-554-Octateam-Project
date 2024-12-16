const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadGameImage, getAllGames, getGameDetails } = require('../controllers/gameController');

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Upload file to AWS S3
router.post('/upload', upload.single('image'), uploadGameImage);

// Fetch games
router.get('/', getAllGames);

// Fetch game details
router.get('/:gameId', getGameDetails);

module.exports = router;
