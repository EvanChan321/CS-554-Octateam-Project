//Login page

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const { db } = await connectToDatabase();

      const user = await db.collection('users').findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      return res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}
