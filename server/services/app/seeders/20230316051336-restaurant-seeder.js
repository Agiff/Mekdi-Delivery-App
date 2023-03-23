'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const categories = require('../db.json').categories.map(el => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    })
    const items = require('../db.json').items.map(el => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    })
    const ingredients = require('../db.json').ingredients.map(el => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    })
    
    await queryInterface.bulkInsert('Categories', categories, {});
    await queryInterface.bulkInsert('Items', items, {});
    await queryInterface.bulkInsert('Ingredients', ingredients, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Items', null, {});
    await queryInterface.bulkDelete('Ingredients', null, {});
  }
};
