const User = require('./chatUser');
const ChatMessage = require('./chatMessage');
const Group = require('./group');
const GroupMember = require('./groupmember');
const Message = require('./groupMessage');

// User - ChatMessage
User.hasMany(ChatMessage, { foreignKey: 'userId', as: 'messages' });
ChatMessage.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User - GroupMember
User.hasMany(GroupMember, { foreignKey: 'userId', as: 'groupMemberships' });
GroupMember.belongsTo(User, { foreignKey: 'userId' });

// Group - GroupMember
Group.hasMany(GroupMember, { foreignKey: 'groupId', as: 'members' });
GroupMember.belongsTo(Group, { foreignKey: 'groupId' });

// Group - Message
Group.hasMany(Message, { foreignKey: 'groupId', as: 'messages' });
Message.belongsTo(Group, { foreignKey: 'groupId' });

// User - Message
User.hasMany(Message, { foreignKey: 'userId', as: 'sentMessages' });
Message.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, ChatMessage, Group, GroupMember, Message };
