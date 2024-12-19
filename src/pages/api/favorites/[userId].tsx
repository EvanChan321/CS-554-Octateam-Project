import { NextApiRequest, NextApiResponse } from 'next';
import { users } from '@/lib/mongoCollections';
import { decrypt } from '../../../../lib/sessions';
import { ObjectId } from 'mongodb';
import redis from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const rawCookies = req.headers.cookie || '';
      const cookies = parseCookies(rawCookies);
      const session = cookies.session;

      if (!session) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No session found' });
      }

      const sessionData = await decrypt(session);
      if (!sessionData || !sessionData.userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid session' });
      }

      const cachedFavorites = await redis.get(`favorites/${sessionData.userId}`);
      if (cachedFavorites) {
        return res.status(200).json({ success: true, favorites: cachedFavorites });
      }

      const usersCollection = await users();
      const user = await usersCollection.findOne({ _id: new ObjectId(sessionData.userId) });

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      redis.set(`favorites/${sessionData.userId}`, JSON.stringify(user.favoriteGames));

      res.status(200).json({
        success: true,
        favorites: user.favoriteGames,
      });
    } catch (error) {
      console.error('Error fetching user favorites:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch user favorites' });
    }
  } else if (req.method === 'POST') {
    try {
      const { gameId } = req.body;
      if (!gameId) {
        return res.status(400).json({ success: false, message: 'Game ID is required' });
      }
  
      const rawCookies = req.headers.cookie || '';
      const cookies = parseCookies(rawCookies);
      const session = cookies.session;
  
      if (!session) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No session found' });
      }
  
      const sessionData = await decrypt(session);
      if (!sessionData || !sessionData.userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid session' });
      }

        const gameResponse = await fetch(`http://localhost:3000/api/games/${gameId}`);
        const gameData = await gameResponse.json();
  
      if (!gameData || !gameData.success) {
        return res.status(404).json({ success: false, message: 'Game not found' });
      }

      console.log(gameData);
  
      const usersCollection = await users();
      const user = await usersCollection.findOne({ _id: new ObjectId(sessionData.userId) });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Check if the game is already in favorites
      const isGameAlreadyFavorite = user.favoriteGames?.some((game: any) => game.gameId === gameId);
      if (isGameAlreadyFavorite) {
        return res.status(400).json({ success: false, message: 'Game is already in your favorites' });
      }
  
 
      await usersCollection.updateOne(
        { _id: new ObjectId(sessionData.userId) },
        {
          $push: {
            favoriteGames: {
              gameId: gameData.game.gameId,
              name: gameData.game.name,
              description: gameData.game.description,
              background_image: gameData.game.background_image,
              released: gameData.game.released,
              rating: gameData.game.rating,
            }
          }
        }
      );
  
      redis.del(`favorites/${sessionData.userId}`);
  
      res.status(200).json({ success: true, message: 'Game added to favorites' });
    } catch (error) {
      console.error('Error adding game to favorites:', error);
      res.status(500).json({ success: false, message: 'Failed to add game to favorites' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
  
  function parseCookies(cookieString: string) {
    return cookieString.split(';').reduce((acc: Record<string, string>, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
  }
}