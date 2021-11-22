'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Description extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Description.belongsTo(models.Product)
    }
  };
  Description.init({
    textline: DataTypes.STRING,
    sn: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Description',
  });
  return Description;
};