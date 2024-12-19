import { NextApiRequest, NextApiResponse } from 'next';
import { users } from '@/lib/mongoCollections';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from "@/lib/firebase"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { email, password } = req.body;  
      console.log("check")
      console.log('Received:', { email, password }); // Log incoming data
        
      try {
        const createdUser = await createUserWithEmailAndPassword(auth, email, password);
        const fbUser = createdUser.user;

        const usersCollection = await users();
        console.log('Connected to users collection.');

        const favoriteGames: never[] = [];
        const reviews: never[] = [];
        const gamesList : never[] = [];
        const forumsList : never[] = [];

        const result = await usersCollection.insertOne({ firebaseId: fbUser.uid, email: fbUser.email, favoriteGames, reviews, gamesList, forumsList });
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
  