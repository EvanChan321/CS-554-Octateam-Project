import { dbConnection, closeConnection } from "@/lib/mongoConnection";

const db = await dbConnection();
await db.collection("forumposts").drop();
await db.collection("games").drop();
await db.collection("users")

let _connection: MongoClient | undefined = undefined;
let _db: Db | undefined = undefined;

const dbConnection = async (): Promise<Db> => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongoClientOptions);
    _db = _connection.db(mongoConfig.database);
  }
  if (!_db) {
    throw new Error("Failed to establish a database connection.");
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
