'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Message, {
        foreignKey: 'senderId',
        as: 'mensajeEscrito'
      })

      models.User.hasOne(models.Message, {
        foreignKey: 'receiverId',
        as: 'recibidos'
      })


    }
  }
  User.init({
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};
