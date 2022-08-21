'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Message.belongsTo(models.User, {
        foreignKey: 'senderId'
      })

      models.Message.belongsTo(models.User, {
        foreignKey: 'receiverId',
        as: 'destinatario'
      })
    }
  }
  Message.init({
    text: DataTypes.TEXT,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    read: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'messages'
  });
  return Message;
};

