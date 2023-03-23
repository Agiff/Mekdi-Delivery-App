const User = require("../models/user");

class userController {
  static async showUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async addUser(req, res) {
    try {
      const { username, email, password, role, phoneNumber, address } = req.body;
      const createdUser = await User.create({ username, email, password, role, phoneNumber, address });
      res.status(201).json(createdUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = userController;