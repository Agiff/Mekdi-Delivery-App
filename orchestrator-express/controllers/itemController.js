const axios = require('axios');
const { entityUrl, userUrl } = require('../config');

class itemController {
  static async getItem (req, res) {
    try {
      const { data } = await axios.get(entityUrl + 'items');
      const response = await axios.get(userUrl + 'users');
      const items = data.map(el => {
        response.data.forEach(user => {
          if (el.authorId === user._id) {
            el.User = user;
          }
        });
        return el;
      })
      res.status(200).json(items);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async findItem (req, res) {
    try {
      const { data } = await axios.get(entityUrl + 'items/' + req.params.id);
      const response = await axios.get(userUrl + 'users/' + data.authorId);
      data.User = response.data;
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async addItem (req, res) {
    try {
      const { data } = await axios.post(entityUrl + 'items', req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async updateItem (req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios.put(`${entityUrl}items/${id}`, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async deleteItem (req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios.delete(`${entityUrl}items/${id}`);
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = itemController;