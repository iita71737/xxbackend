'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SizeRelation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SizeRelation.belongsTo(models.Product)
      SizeRelation.belongsTo(models.Sizes)
    }
  };
  SizeRelation.init({
    SizeId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SizeRelation',
  });
  return SizeRelation;
};