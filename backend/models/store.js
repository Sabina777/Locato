'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Store.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    category: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    opening_hours: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};