'use strict';
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products',
      Array.from({ length: 10 }).map((item, index) =>
      ({
        id: index + 1,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        specification: faker.commerce.department(),
        material: faker.commerce.productMaterial(),
        color: faker.commerce.color(),
        seal: "AU284",
        remark: faker.commerce.productAdjective(),
        CategoryId: Math.floor(Math.random() * 6) * 10 + 1,
        isFollowed: false,
        isInCart: false,
        createdAt: new Date(),
        updatedAt: new Date(),

      })
      ), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
