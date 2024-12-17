// Sign-up page

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const { db } = await connectToDatabase();

      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await db.collection('users').insertOne({
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      return res.status(201).json({ message: 'User created', userId: result.insertedId });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}
