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
      { UserMongoId: '642182ddbb8c462d946114c4' },
      { authorId: 1 }
    );
    await queryInterface.bulkUpdate('Items',
      { UserMongoId: '642182ddbb8c462d946114c5' },
      { authorId: 2 }
    );
    await queryInterface.bulkUpdate('Items',
      { UserMongoId: '642182ddbb8c462d946114c6' },
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
