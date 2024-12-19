import { NextApiRequest, NextApiResponse } from 'next';
import { decrypt } from '../../../lib/sessions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const rawCookies = req.headers.cookie || '';
  const cookies = parseCookies(rawCookies);
  const session = cookies.session;

  if (session) {
    try {
      const decryptedSession = await decrypt(session); 
      const userId = decryptedSession?.userId;  
      
      // If userId exists, return it
      if (userId) {
        return res.status(200).json({ loggedIn: true, userId });
      } else {
        return res.status(200).json({ loggedIn: false });
      }
    } catch (error) {
      console.error('Error decrypting session:', error);
      return res.status(500).json({ loggedIn: false });
    }
  } else {
    return res.status(200).json({ loggedIn: false });
  }
}

function parseCookies(cookieString: string) {
  return cookieString.split(';').reduce((acc: Record<string, string>, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
}
