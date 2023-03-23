const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(url);
const dbName = 'user_db';
const docs = require('./user-init.json');

async function userSeeder() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const database = client.db(dbName);
    const users = database.collection('users');

    const result = await users.insertMany(docs);

    console.log(result);
  } catch (error) {
    await client.close()
  }
}

userSeeder().catch(console.dir);