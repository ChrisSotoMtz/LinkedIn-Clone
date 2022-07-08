import { MongoClient } from "mongodb";

var uri = process.env.MONGODB_URI;
var dbName = process.env.MONGODB_DB;

var cachedClient = null;
var cachedDb = null;

if (!uri) {
  throw new Error("MONGODB_URI environment variable not set");
}

if (!dbName) {
  throw new Error("MONGODB_DB environment variable not set");
}

export async function getDb() {
  if (cachedDb && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return  {client,db};
}
