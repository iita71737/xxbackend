'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Images', 'ProductId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Images', 'ProductId')
  }
};
