import { NextApiRequest, NextApiResponse } from 'next';
import { users } from '@/lib/mongoCollections';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { encrypt } from '../../../../lib/sessions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log(`Login request received for: ${email}`);
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      const signedInUser = await signInWithEmailAndPassword(auth, email, password);
      const usersCollection = await users();
      const user = await usersCollection.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const session = await encrypt({ firebaseId: user.firebaseId, user: user.email });
      // Set a session cookie (no Max-Age or Expires, so it expires when the browser is closed)
      res.setHeader(
        'Set-Cookie',
        `session=${encodeURIComponent(session)}; HttpOnly; Path=/; Secure; SameSite=Strict`
      );

      res.status(200).json({ user: { email: user.email } });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else if (req.method === 'GET') {
    const rawCookies = req.headers.cookie || '';
    const cookies = parseCookies(rawCookies);
    const session = cookies.session;
    console.log(req.headers.cookie);

    if (!session) {
      return res.status(401).json({ message: 'No session found' });
    }

    console.log(`Session cookie: ${session}`);
    res.status(200).json({ message: 'Cookie retrieved successfully', session });
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Utility function to parse cookies
function parseCookies(cookieString: string) {
  return cookieString.split(';').reduce((acc: Record<string, string>, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = decodeURIComponent(value); // Ensure decoding
    return acc;
  }, {});
}
