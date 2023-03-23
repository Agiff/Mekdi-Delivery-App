const axios = require('axios');
const { userUrl } = require("../config");

class userController {
  static async showUsers(req, res, next) {
    try {
      const { data } = await axios.get(userUrl + 'users')
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async findUser(req, res, next) {
    try {
      const { data } = await axios.get(userUrl + 'users/' + req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async addUser(req, res, next) {
    try {
      const { data } = await axios.post(userUrl + 'users', req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async removeUser(req, res, next) {
    try {
      const { data } = await axios.delete(userUrl + 'users/' + req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = userController;