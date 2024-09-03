const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Group = require('./group');
const User = require('./chatUser');

const GroupMember = sequelize.define('GroupMember', {
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
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  joinedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: false,
});
module.exports = GroupMember;
