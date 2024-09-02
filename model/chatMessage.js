const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = require('./chatUser'); // Import User model

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

// Define associations
ChatMessage.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(ChatMessage, { foreignKey: 'userId', as: 'messages' });

module.exports = ChatMessage;
