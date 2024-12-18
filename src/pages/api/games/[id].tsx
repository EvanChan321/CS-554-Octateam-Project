import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { games } from '@/lib/mongoCollections';
import redis from '@/lib/redis';

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const RAWG_API_URL = 'https://api.rawg.io/api/games';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const cachedGames = await redis.get('featured');