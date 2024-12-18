import { NextApiRequest, NextApiResponse } from 'next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log(`Login request received for: ${email}`);
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      // Firebase sign-in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user);

      // Get the Firebase ID token for the user
      const idToken = await userCredential.user.getIdToken();

      // Send the ID token to the client (you can also send user data if needed)
      res.status(200).json({ token: idToken });
    } catch (error) {
      if (error === 'auth/user-not-found' || error === 'auth/wrong-password') {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
