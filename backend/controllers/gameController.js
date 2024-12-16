import { fetchGames, fetchGameDetails } from '../services/rawgService.js';
import { uploadFile } from '../services/awsService.js';
import formatResponse from '../utils/formatResponse.js';

/**
 * Fetch a list of games.
 */
export const getAllGames = async (req, res, next) => {
  try {
    const searchQuery = req.query.search || '';
    const games = await fetchGames(searchQuery);
    res.status(200).json(formatResponse('Games fetched successfully', games));
  } catch (error) {
    next(error);
  }
};

/**
 * Fetch game details by ID.
 */
export const getGameDetails = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const gameDetails = await fetchGameDetails(gameId);
    res.status(200).json(formatResponse('Game details fetched successfully', gameDetails));
  } catch (error) {
    next(error);
  }
};

export const uploadGameImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileBuffer = req.file.buffer;
    const fileName = `game-images/${Date.now()}-${req.file.originalname}`;
    const uploadResult = await uploadFile(fileBuffer, fileName, req.file.mimetype);

    res.status(200).json(formatResponse('File uploaded successfully', { url: uploadResult.Location }));
  } catch (error) {
    next(error);
  }
};
