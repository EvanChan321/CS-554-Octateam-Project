import { dbConnection } from './mongoConnection.js';
import { Collection, Db } from 'mongodb'; // Import MongoDB types

/* This will allow you to have one reference to each collection per app */
const getCollectionFn = (collection: string): (() => Promise<Collection>) => {
  let _col: Collection | undefined = undefined;

  return async () => {
    if (!_col) {
      const db: Db = await dbConnection();
      _col = db.collection(collection);
    }

    return _col;
  };
};

/* Now, you can list your collections here: */
export const users = getCollectionFn('users');
export const games = getCollectionFn('games');
export const gameLists = getCollectionFn('gameLists');
export const forumPosts = getCollectionFn('forumPosts');
export const comments = getCollectionFn('comments');
export const ratings = getCollectionFn('ratings');
