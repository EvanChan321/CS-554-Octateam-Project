import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { users } from '@/lib/mongoCollections';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      // Access the users collection
      const usersCollection = await users();

      // Find the user by email
      const user = await usersCollection.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      // Compare the password with the stored hash
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
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
