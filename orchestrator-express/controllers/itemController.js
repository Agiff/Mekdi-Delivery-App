const axios = require('axios');
const { entityUrl, userUrl, redis } = require('../config');

class itemController {
  static async getItem (req, res) {
    try {
      const itemCache = await redis.get('app:items');
      if (itemCache) return res.status(200).json(JSON.parse(itemCache));

      const { data } = await axios.get(entityUrl + 'items');
      const response = await axios.get(userUrl + 'users');
      const items = data.map(el => {
        response.data.forEach(user => {
          if (el.UserMongoId === user._id) {
            el.User = user;
          }
        });
        return el;
      })
      await redis.set('app:items', JSON.stringify(items), 'EX', 600);
      res.status(200).json(items);
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async findItem (req, res) {
    try {
      const { data } = await axios.get(entityUrl + 'items/' + req.params.id);
      const response = await axios.get(userUrl + 'users/' + data.UserMongoId);
      data.User = response.data;
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async addItem (req, res) {
    try {
      const { data } = await axios.post(entityUrl + 'items', req.body);
      await redis.del('app:items');
      res.status(201).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async updateItem (req, res) {
    try {
      const { data } = await axios.put(entityUrl + 'items/' + req.params.id, req.body);
      await redis.del('app:items');
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async deleteItem (req, res) {
    try {
      const { data } = await axios.delete(entityUrl + 'items/' + req.params.id);
      await redis.del('app:items');
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = itemController;