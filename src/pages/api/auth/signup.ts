import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { users } from '@/lib/mongoCollections';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { email, password } = req.body;
  
      console.log("check")
      console.log('Received:', { email, password }); // Log incoming data
        
      try {
        const usersCollection = await users();
        console.log('Connected to users collection.');
  
        // Additional logging before insertion
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed.');
  
        const result = await usersCollection.insertOne({ email, password: hashedPassword });
        console.log('User inserted:', result);
  
        res.status(201).json({ message: 'User created successfully.' });
      } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  