import axios from 'axios';

const RAWG_API_BASE_URL = 'https://api.rawg.io/api';
const RAWG_API_KEY = process.env.RAWG_API_KEY;

/**
 * Fetch a list of games from RAWG API.
 * @param {string} searchQuery - Optional search query.
 */
export const fetchGames = async (searchQuery = '') => {
  try {
    if (!RAWG_API_KEY) {
      throw new Error('RAWG API Key is missing or undefined');
    }

    console.log('Using RAWG API Key:', RAWG_API_KEY); // Debug log to check if the API key is loaded

    const response = await axios.get(`${RAWG_API_BASE_URL}/games`, {
      params: { key: RAWG_API_KEY, search: searchQuery, page_size: 10 }
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Error fetching games from RAWG API: ' + error.message);
  }
};

/**
 * Fetch game details by ID from RAWG API.
 * @param {string} gameId - Game ID.
 */
export const fetchGameDetails = async (gameId) => {
  try {
    if (!RAWG_API_KEY) {
      throw new Error('RAWG API Key is missing or undefined');
    }

    console.log('Using RAWG API Key:', RAWG_API_KEY); // Debug log to check if the API key is loaded

    const response = await axios.get(`${RAWG_API_BASE_URL}/games/${gameId}`, {
      params: { key: RAWG_API_KEY }
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Error fetching game details: ' + error.message);
  }
};
