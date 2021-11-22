'use strict';
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images',
      Array.from({ length: 10 }).map((item, index) =>
      ({
        id: index + 1,
        sn: faker.datatype.number(),
        url: faker.image.image(),
        ProductId: Math.floor(Math.random() * 10) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      ), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Images', null, {})
  }
};
