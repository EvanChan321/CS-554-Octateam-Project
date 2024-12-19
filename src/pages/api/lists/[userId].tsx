import { NextApiRequest, NextApiResponse } from 'next';
import { users } from '@/lib/mongoCollections';
import { decrypt } from '../../../../lib/sessions'; 
import { ObjectId } from 'mongodb'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Extract session cookie
      const rawCookies = req.headers.cookie || '';
      const cookies = parseCookies(rawCookies);
      const session = cookies.session;

      // Check if session exists
      if (!session) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No session found' });
      }

      // Decrypt the session to get the userId
      const sessionData = await decrypt(session);
      if (!sessionData || !sessionData.userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid session' });
      }

      // Fetch the user from MongoDB using the userId
      const usersCollection = await users();
      const user = await usersCollection.findOne({ _id: new ObjectId(sessionData.userId) });

      // Check if user exists
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Return the user's game list
      res.status(200).json({
        success: true,
        games: user.gameList || [], // Assuming gameList is an array in your user document
      });
    } catch (error) {
      console.error('Error fetching user game list:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch user game list' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

// Utility function to parse cookies
function parseCookies(cookieString: string) {
  return cookieString.split(';').reduce((acc: Record<string, string>, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
}
