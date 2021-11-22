'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('LineItems',
      Array.from({ length: 10 }).map((item, index) =>
      ({
        CartId: Math.floor(Math.random() * 3) + 1,
        ProductId: Math.floor(Math.random() * 10) + 1,
        quantity: Math.floor(Math.random() * 5) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      ), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('LineItems', null, {})
  }
};
