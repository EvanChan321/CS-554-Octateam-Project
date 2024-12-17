import express from 'express';
import { getAllGames, getGameDetails, rateGame, commentOnGame } from '../controllers/gameController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllGames);
router.get('/:gameId', getGameDetails);
router.post('/:gameId/rate', authMiddleware, rateGame);
router.post('/:gameId/comment', authMiddleware, commentOnGame);

export default router;
