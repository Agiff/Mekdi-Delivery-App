const axios = require('axios');
const { userUrl, redis } = require("../config");

class userController {
  static async showUsers(req, res, next) {
    try {
      const userCache = await redis.get('app:users');
      if (userCache) return res.status(200).json(JSON.parse(userCache));

      const { data } = await axios.get(userUrl + 'users');
      await redis.set('app:users', JSON.stringify(data), 'EX', 600);
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
      await redis.del('app:users');
      res.status(201).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async removeUser(req, res, next) {
    try {
      const { data } = await axios.delete(userUrl + 'users/' + req.params.id);
      await redis.del('app:users');
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = userController;