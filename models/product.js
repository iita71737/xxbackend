'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category)
      Product.hasMany(models.SizeRelation)
      Product.hasMany(models.Images, { foreignKey: { name: 'id', allowNull: false } })
      Product.hasMany(models.Description)

      Product.belongsToMany(models.Cart, {
        as: 'carts',
        through: {
          model: models.LineItem, unique: false
        },
        foreignKey: 'ProductId',
      });
      Product.belongsToMany(models.Order, {
        as: 'orders',
        through: {
          model: models.OrderItem, unique: false
        },
        foreignKey: 'ProductId',
      });

    }
  };
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    specification: DataTypes.STRING,
    material: DataTypes.STRING,
    color: DataTypes.STRING,
    seal: DataTypes.STRING,
    remark: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    isFollowed: DataTypes.BOOLEAN,
    isInCart: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};