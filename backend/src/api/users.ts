import express from 'express';
import { getUser } from '../services/userService';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).send('Error fetching user data');
  }
});

export default router;
