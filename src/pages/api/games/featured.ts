import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { games } from '@/lib/mongoCollections';
import { MongoClient } from 'mongodb';

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const RAWG_API_URL = 'https://api.rawg.io/api/games';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Step 1: Fetch featured games from RAWG API
    const { data } = await axios.get(RAWG_API_URL, {
      params: {
        key: RAWG_API_KEY,
        page_size: 6, // Limit to 6 featured games
      },
    });

    const gamesData = data.results.map((game: any) => ({
      gameId: game.id,
      name: game.name,
      description: game.description || 'No description available.',
      background_image: game.background_image,
      released: game.released,
    }));

    // Step 2: Cache or update data in MongoDB
    const gamesCollection = await games();
    for (const game of gamesData) {
      await gamesCollection.updateOne(
        { gameId: game.gameId },
        { $set: game },
        { upsert: true } // Insert new game if it doesn't exist
      );
    }

    // Return the fetched games
    res.status(200).json({ success: true, games: gamesData });
  } catch (error: any) {
    console.error('Error fetching featured games:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch games.' });
  }
}
