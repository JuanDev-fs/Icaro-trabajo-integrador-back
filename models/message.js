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

    //modelos definidos jueves 4 de agosto 2022
      models.Message.belongsTo(models.User, {
        foreignKey:'senderId'
    })

    models.Message.belongsTo(models.User, {
      foreignKey:'receiverId',
      as:'destinatario'
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



///test del dia 4 de agosto de 2022, asociaciones
//001
/* 

models.Message.belongsTo(models.User, {
        foreignKey:'senderId'
    })

    models.Message.belongsTo(models.User, {
      foreignKey:'receiverId',
      as:'destinatario'
  })

*/