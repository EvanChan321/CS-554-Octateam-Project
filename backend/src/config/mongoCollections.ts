import {dbConnection} from './mongoConnection';

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

export const users = getCollectionFn('users');
export const books = getCollectionFn('books');
export const books_clubs = getCollectionFn('book_clubs');
export const discussions = getCollectionFn('discussions');
