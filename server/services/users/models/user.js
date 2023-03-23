const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/mongoConnection');
const { hashPassword } = require('../helpers/bcrypt');

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

  static async create(data) {
    data.password = hashPassword(data.password);
    const createdUser = await this.collection().insertOne(data);
    return createdUser;
  }
}

module.exports = User;