const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = require('./chatUser');

const ChatMessage = sequelize.define('ChatMessage', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});
module.exports = ChatMessage;
