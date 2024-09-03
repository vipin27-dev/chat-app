const Group = require('../model/group');
const GroupMember = require('../model/groupmember');
const Message = require('../model/groupMessage');
const User = require('../model/chatUser');

exports.createGroup = async (req, res) => {
  const { name, description, userId, inviteUsers } = req.body;

  try {
    // Create a new group
    const group = await Group.create({
      name,
      description,
      createdBy: userId
    });

    // Add the creator as the first member and admin
    await GroupMember.create({
      groupId: group.id,
      userId,
      isAdmin: true
    });

    // Add invited users to the group
    if (inviteUsers && inviteUsers.length) {
      const users = await User.findAll({
        where: {
          email: inviteUsers
        }
      });

      for (const user of users) {
        await GroupMember.create({
          groupId: group.id,
          userId: user.id,
          isAdmin: false
        });
      }
    }

    res.status(201).json({ success: true, message: 'Group created successfully!' });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ success: false, message: 'An error occurred while creating the group.' });
  }
};

exports.addMember = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body;

  try {
    await GroupMember.create({
      groupId,
      userId,
      isAdmin: false
    });

    res.status(200).json({ success: true, message: 'Member added successfully!' });
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ success: false, message: 'An error occurred while adding the member.' });
  }
};

exports.removeMember = async (req, res) => {
  const { groupId, userId } = req.params;

  try {
    await GroupMember.destroy({
      where: {
        groupId,
        userId
      }
    });

    res.status(200).json({ success: true, message: 'Member removed successfully!' });
  } catch (error) {
    console.error('Error removing member:', error);
    res.status(500).json({ success: false, message: 'An error occurred while removing the member.' });
  }
};

exports.sendMessage = async (req, res) => {
  const { groupId } = req.params;
  const { userId, message } = req.body;

  try {
    await Message.create({
      groupId,
      userId,
      message
    });

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, message: 'An error occurred while sending the message.' });
  }
};

exports.getMessages = async (req, res) => {
  const { groupId } = req.params;

  try {
    const messages = await Message.findAll({
      where: {
        groupId
      },
      include: [
        { model: User, attributes: ['name'] }
      ],
      order: [['createdAt', 'ASC']]
    });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching the messages.' });
  }
};
