import { NextApiRequest, NextApiResponse } from 'next';
import { users } from '@/lib/mongoCollections';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log(`Login request received for: ${email}`);
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid input type.' });
    }
    
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }
  
    if (trimmedPassword.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    try {
      const signedInUser = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      // Access the users collection
      const usersCollection = await users();
      // Find the user by email
      const user = await usersCollection.findOne({ trimmedEmail });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      // Return the user's email (and optionally other non-sensitive info)
      res.status(200).json({ user: { email: user.email } });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
