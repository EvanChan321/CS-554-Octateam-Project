import express from 'express';
import multer from 'multer';
import { getAllGames, uploadGameImage, getGameDetails } from '../controllers/gameController.js';
const router = express.Router();

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Upload file to AWS S3
router.post('/upload', upload.single('image'), uploadGameImage);

// Fetch games
router.get('/', getAllGames);

// Fetch game details
router.get('/:gameId', getGameDetails);
export default router;
