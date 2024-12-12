import express from 'express';
import { getGameDetails } from '../services/gameService';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const gameDetails = await getGameDetails(req.params.id);
    res.json(gameDetails);
  } catch (error) {
    res.status(500).send('Error fetching game data');
  }
});

export default router;
