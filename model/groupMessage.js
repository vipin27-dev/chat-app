const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Group = require('./group');
const User = require('./chatUser');

const Message = sequelize.define('Message', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  groupId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});
module.exports = Message;
