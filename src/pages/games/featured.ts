import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { games } from '@/lib/mongoCollections';

import redis from '@/lib/redis';

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const RAWG_API_URL = 'https://api.rawg.io/api/games';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cachedGames = await redis.get('featured');

    if (cachedGames) {
      return res.status(200).json({ success: true, games: cachedGames });
    }

    const { data } = await axios.get(RAWG_API_URL, {
      params: {
        key: RAWG_API_KEY,
        page_size: 6,
      },
    });

    const gamesData = data.results.map((game: any) => ({
      gameId: game.id,
      name: game.name,
      description: game.description || 'No description available.',
      background_image: game.background_image,
      released: game.released,
      rating: game.rating || 0
    }));

    await redis.set('featured', JSON.stringify(gamesData));

    const gamesCollection = await games();
    for (const game of gamesData) {
      await gamesCollection.updateOne(
        { gameId: game.gameId },
        { $set: game },
        { upsert: true }
      );
    }

    res.status(200).json({ success: true, games: gamesData });
  } catch (error: any) {
    console.error('Error fetching featured games:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch games.' });
  }
}