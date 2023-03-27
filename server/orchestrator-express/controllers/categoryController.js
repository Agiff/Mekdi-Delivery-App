const axios = require('axios');
const { entityUrl, redis } = require('../config');

class categoryController {
  static async showCategory(req, res, next) {
    try {
      const categoryCache = await redis.get('app:categories');
      if (categoryCache) return res.status(200).json(JSON.parse(categoryCache));

      const { data } = await axios.get(entityUrl + 'categories')
      await redis.set('app:categories', JSON.stringify(data));
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { data } = await axios.post(entityUrl + 'categories', req.body);
      await redis.del('app:categories');
      res.status(201).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { data } = await axios.put(entityUrl + 'categories/' + req.params.id, req.body);
      await redis.del('app:categories');
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { data } = await axios.delete(entityUrl + 'categories/' + req.params.id);
      await redis.del('app:categories');
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = categoryController;