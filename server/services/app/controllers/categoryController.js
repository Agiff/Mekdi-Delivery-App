const { Category } = require('../models');

class categoryController {
  static async showCategory (req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory (req, res, next) {
    try {
      const { name } = req.body;
      const createdCategory = await Category.create({ name });
      res.status(201).json(createdCategory);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory (req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await Category.findByPk(id);
      if (!category) throw { name: 'NotFound' };
      console.log(category);
      const updatedCategory = await category.update({ name });
      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory (req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) throw { name: 'NotFound' };
      await category.destroy();
      res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = categoryController;