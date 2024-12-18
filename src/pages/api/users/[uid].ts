import { users } from '@/lib/mongoCollections';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = req.query;

  if (req.method === 'GET') {
    try {
      // Find user in MongoDB by UID
      const usersCollection = await users();
      const user = await usersCollection.findOne({ uid });

      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }

      res.status(200).json({ success: true, user });
    } catch (error: any) {
      console.error('Error fetching user:', error.message);
      res.status(500).json({ success: false, message: 'Failed to fetch user' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
