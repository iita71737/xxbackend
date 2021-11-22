'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LineItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LineItem.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    CartId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LineItem',
  });
  return LineItem;
};