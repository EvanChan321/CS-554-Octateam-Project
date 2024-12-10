import express from 'express';
import { getAllGames, createGame } from '../services/gameService';

const router = express.Router();

// GET all games
router.get('/', async (req, res) => {
  try {
    const games = await getAllGames();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new game
router.post('/', async (req, res) => {
  try {
    const { name, genre, rating } = req.body;
    if (!name || !genre || typeof rating !== 'number') {
      return res.status(400).json({ error: 'Invalid game data.' });
    }
    const gameId = await createGame({ name, genre, rating });
    res.status(201).json({ message: 'Game created successfully.', gameId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
