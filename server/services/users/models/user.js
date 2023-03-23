const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/mongoConnection');

class User {
  static collection() {
    const db = getDatabase();
    const usersCollection = db.collection('users');
    return usersCollection;
  }

  static async findAll() {
    const users = await this.collection().find().toArray();
    return users;
  }
}

module.exports = User;