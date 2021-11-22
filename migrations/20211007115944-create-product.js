'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      specification: {
        type: Sequelize.STRING
      },
      material: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      seal: {
        type: Sequelize.STRING
      },
      remark: {
        type: Sequelize.STRING
      },
      CategoryId: {
        type: Sequelize.INTEGER
      },
      isFollowed: {
        type: Sequelize.BOOLEAN
      },
      isInCart: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};