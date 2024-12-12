import axios from 'axios';

const RAWG_API_KEY = process.env.RAWG_API_KEY;

const BASE_URL = 'https://api.rawg.io/api/';

export const getGameDetails = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}games/${id}`, {
      params: {
        key: RAWG_API_KEY,
      }
    });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching game data:', error);
    throw new Error('Unable to fetch game details');
  }
};

export const searchGames = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}games`, {
      params: {
        key: RAWG_API_KEY,
        page_size: 10,
        search: query,
      }
    });
    return response.data;
  }
  catch (error) {
    console.error('Error searching games:', error);
    throw new Error('Unable to search games');
  }
};
