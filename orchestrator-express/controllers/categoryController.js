const axios = require('axios');
const { entityUrl } = require('../config');

class categoryController {
  static async showCategory(req, res, next) {
    try {
      const { data } = await axios.get(entityUrl + 'categories')
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { data } = await axios.post(entityUrl + 'categories', req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { data } = await axios.put(entityUrl + 'categories/' + req.params.id, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { data } = await axios.delete(entityUrl + 'categories/' + req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = categoryController;