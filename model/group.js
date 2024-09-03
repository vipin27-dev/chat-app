const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const GroupMember = require('./groupmember');
const Message = require('./groupMessage');

const Group = sequelize.define('Group', {
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
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});
module.exports = Group;
