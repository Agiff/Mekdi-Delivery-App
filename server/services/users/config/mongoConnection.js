const { MongoClient } = require('mongodb');

const url = process.env.MONGO_SECRET;
const client = new MongoClient(url);
const dbName = 'user_db';
let db;

async function mongoConnect() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    db = client.db(dbName);
    return 'done.';
  } catch (error) {
    await client.close()
  }
}

const getDatabase = () => db;

module.exports = { mongoConnect, getDatabase };