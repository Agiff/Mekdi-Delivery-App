const User = require("../models/user");

class userController {
  static async showUsers(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async findUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async addUser(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } = req.body;
      const createdUser = await User.create({ username, email, password, role, phoneNumber, address });
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async removeUser(req, res, next) {
    try {
      const { id } = req.params;
      const deletedUser = await User.delete(id);
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = userController;