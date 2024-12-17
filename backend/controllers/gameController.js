import { fetchGames, fetchGameDetails } from '../services/rawgService.js';
import formatResponse from '../utils/formatResponse.js';

export const getAllGames = async (req, res, next) => {
  try {
    const games = await fetchGames(req.query.search);
    res.status(200).json(formatResponse('Games fetched successfully', games));
  } catch (error) {
    next(error);
  }
};

export const getGameDetails = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const gameDetails = await fetchGameDetails(gameId);
    res.status(200).json(formatResponse('Game details fetched successfully', gameDetails));
  } catch (error) {
    next(error);
  }
};

export const rateGame = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const { rating } = req.body;
    res.status(201).json(formatResponse('Game rated successfully', { gameId, rating }));
  } catch (error) {
    next(error);
  }
};

export const commentOnGame = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const { comment } = req.body;
    res.status(201).json(formatResponse('Comment added successfully', { gameId, comment }));
  } catch (error) {
    next(error);
  }
};
