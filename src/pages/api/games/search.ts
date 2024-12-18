import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, genre } = req.query;
  try {
    const apiKey = process.env.RAWG_API_KEY;
    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${query}${
      genre && genre !== 'All' ? `&genres=${genre}` : ''
    }`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json({ success: true, games: data.results });
  }
  catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch games.' });
  }
}
