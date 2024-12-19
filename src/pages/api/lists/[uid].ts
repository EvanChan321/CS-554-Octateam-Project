import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from '@/lib/mongoCollections';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    // Convert uid to ObjectId
    let userId;
    try {
      userId = new ObjectId(uid);
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }

    if (req.method === 'GET') {
      // Fetch the user's game list
      const userList = await users.findOne({ _id: userId.toString() });

      if (!userList) {
        return res.status(200).json({ success: true, games: [] });
      }

      return res.status(200).json({ success: true, games: userList.games });
    }

    if (req.method === 'POST') {
      // Add a game to the user's list
      const { gameId, title, imageUrl, rating } = req.body;

      if (!gameId || !title || !imageUrl || rating == null) {
        return res.status(400).json({ success: false, message: 'Invalid data' });
      }

      await users.updateOne(
        { _id: new ObjectId(userId) },
        { $addToSet: { games: { gameId, title, imageUrl, rating } } },
        { upsert: true }
      );

      return res.status(200).json({ success: true, message: 'Game added to list' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
