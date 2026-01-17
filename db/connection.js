const { MongoClient } = require('mongodb');

let db;

const initDb = async (uri, dbName) => {
  if (db) return db;

  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);

  return db;
};

const getDb = () => {
  if (!db) throw new Error('Database not initialized. Call initDb first.');
  return db;
};

module.exports = { initDb, getDb };
