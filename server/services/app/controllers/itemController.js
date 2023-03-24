const { Item, Ingredient, Category, sequelize } = require('../models');

class itemController {
  static async showItems(req, res, next) {
    try {
      const items = await Item.findAll({
        include: [Category, Ingredient]
      });
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  static async getUserItems(req, res, next) {
    try {
      const items = await Item.findAll({
        include: [Category, Ingredient]
      });
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  static async showItemDetail(req, res, next) {
    try {
      const { id } = req.params;
      const item = await Item.findByPk(id, {
        include: [Category, Ingredient]
      });
      if (!item) throw { name: 'NotFound' };
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  static async getUserItemDetail(req, res, next) {
    try {
      const { id } = req.params;
      const item = await Item.findByPk(id, {
        include: [Category, Ingredient]
      });
      if (!item) throw { name: 'NotFound' };
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  static async createItem(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, description, price, imgUrl, categoryId, ingredients, UserMongoId } = req.body;
      const createdItem = await Item.create(
        { name, description, price, imgUrl, categoryId, UserMongoId },
        { transaction: t });

      const newIngredients = ingredients.filter(el => el !== '').map(el => {
        return { name: el, itemId: createdItem.id }
      })
      await Ingredient.bulkCreate(newIngredients, { transaction: t });

      await t.commit();
      res.status(201).json({ message: 'Item created' });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async updateItem(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, imgUrl, categoryId } = req.body;
      const item = await Item.findByPk(id);
      if (!item) throw { name: 'NotFound' };
      const updatedItem = await item.update({ name, description, price, imgUrl, categoryId });
      res.status(200).json(updatedItem);
    } catch (error) {
      next(error);
    }
  }

  static async deleteItem(req, res, next) {
    try {
      const { id } = req.params;
      const item = await Item.findByPk(id);
      if (!item) throw { name: 'Not Found' };
      await item.destroy();
      res.status(200).json({ message: 'Item deleted' })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = itemController;