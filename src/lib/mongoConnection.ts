import { MongoClient, Db, MongoClientOptions } from 'mongodb';
import { mongoConfig } from './settings';

let _connection: MongoClient | undefined = undefined; // Explicitly type as MongoClient
let _db: Db | undefined = undefined; // Explicitly type as Db

const dbConnection = async (): Promise<Db> => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongoClientOptions);
    _db = _connection.db(mongoConfig.database);
  }

  return _db;
};

const closeConnection = async (): Promise<void> => {
  if (_connection) {
    await _connection.close();
    _connection = undefined;
    _db = undefined;
  }
};

export { dbConnection, closeConnection };
