import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Log the user out using Firebase Auth
      await signOut(auth);

      console.log('User signed out from Firebase');

      // Clear the session cookie by setting it to an expired date
      res.setHeader('Set-Cookie', 'session=; Max-Age=0; HttpOnly; Path=/; Secure; SameSite=Strict');

      res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ success: false, message: error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
