import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Log the user out using Firebase Auth
      await signOut(auth);

      res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error: any) {
      console.error('Error during logout:', error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
