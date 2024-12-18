import { NextApiRequest, NextApiResponse } from 'next';
import redis from '@/lib/redis';
import axios from 'axios';

const RAWG_API_KEY = process.env.RAWG_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const cachedGame = await redis.get(`game_${id}`);

    if (cachedGame) {
      return res.status(200).json({ success: true, game: cachedGame });
    }

    const { data } = await axios.get(`https://api.rawg.io/api/games/${id}`, {
      params: {
        key: RAWG_API_KEY,
      },
    });
    
    const gameData = {
      gameId: data.id,
      name: data.name,
      description: data.description_raw || 'No description available.',
      background_image: data.background_image,
      released: data.released,
      rating: data.rating || 0,
      website: data.website || 'No website available.',
      ratings_count: data.ratings_count || 0,
      esrb_rating: data.esrb_rating.name
    };

    await redis.set(`game_${id}`, JSON.stringify(gameData));

    return res.status(200).json({ success: true, game: gameData });
  } catch (error) {
    console.error('Error fetching game data:', error);
    return res.status(500).json({ error: 'Failed to fetch game data' });
  }
}