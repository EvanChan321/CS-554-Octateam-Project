import { games } from '../config/mongoCollections';
import { Game } from '../models/Game';

export const getAllGames = async () => {
  const gamesCollection = await games();
  return await gamesCollection.find({}).toArray();
};

export const createGame = async (gameData: Game) => {
  const gamesCollection = await games();
  const result = await gamesCollection.insertOne(gameData);
  if (!result.acknowledged) throw new Error('Failed to insert the game.');
  return result.insertedId;
};
