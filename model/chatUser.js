const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const ChatMessage = require('./chatMessage');
const GroupMember = require('./groupmember');
const Message = require('./groupMessage');

const User = sequelize.define('ChatUser', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phno: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = User;
