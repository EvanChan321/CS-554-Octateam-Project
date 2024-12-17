import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { users } from '@/lib/mongoCollections';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, username } = req.body;

    try {
      // Step 1: Register user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Store user details in MongoDB
      const usersCollection = await users();
      const newUser = {
        uid: user.uid, // Firebase Auth UID
        email: user.email,
        username: username || email.split('@')[0], // Default username from email
        profilePicture: null, // Placeholder for profile picture
        createdAt: new Date().toISOString(),
      };

      await usersCollection.insertOne(newUser);

      res.status(201).json({ success: true, uid: user.uid, email: user.email });
    } catch (error: any) {
      console.error('Registration error:', error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
