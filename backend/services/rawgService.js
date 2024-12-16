import axios from 'axios';

const RAWG_API_BASE_URL = 'https://api.rawg.io/api';
const RAWG_API_KEY = process.env.RAWG_API_KEY;

/**
 * Fetch a list of games from RAWG API.
 * @param {string} searchQuery - Optional search query.
 */
export const fetchGames = async (searchQuery = '') => {
  try {
    const response = await axios.get(`${RAWG_API_BASE_URL}/games`, {
      params: { key: RAWG_API_KEY, search: searchQuery, page_size: 10 }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching games from RAWG API: ' + error.message);
  }
};

/**
 * Fetch game details by ID from RAWG API.
 * @param {string} gameId - Game ID.
 */
export const fetchGameDetails = async (gameId) => {
  try {
    const response = await axios.get(`${RAWG_API_BASE_URL}/games/${gameId}`, {
      params: { key: RAWG_API_KEY }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching game details: ' + error.message);
  }
};
