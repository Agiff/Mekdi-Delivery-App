'use strict';

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
    await queryInterface.bulkUpdate('Items',
      { UserMongoId: '641ccae60999029b686a7e49' },
      { authorId: 1 }
    );
    await queryInterface.bulkUpdate('Items',
      { UserMongoId: '641ccae60999029b686a7e4a' },
      { authorId: 2 }
    );
    await queryInterface.bulkUpdate('Items',
      { UserMongoId: '641ccae60999029b686a7e4b' },
      { authorId: 3 }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
