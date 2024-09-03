const User = require('../model/chatUser');
const ChatMessage = require('../model/chatMessage');
const { Op } = require("sequelize");
const { io } = require('../socket'); // Ensure this path is correct

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "An error occurred while fetching users" });
  }
};

exports.getMessages = async (req, res) => {
  const lastMessageId = req.query.lastMessageId || 0;

  try {
    const messages = await ChatMessage.findAll({
      where: {
        id: {
          [Op.gt]: lastMessageId // Only fetch messages greater than the lastMessageId
        }
      },
      include: [{ model: User, as: "user", attributes: ["name"] }], // Ensure association is correct
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(500).json({ message: "An error occurred while fetching messages" });
  }
};

exports.sendMessage = async (req, res) => {
  const { userId, message } = req.body;

  try {
    if (!userId || !message) {
      return res.status(400).json({ message: "User ID and message are required" });
    }

    const foundUser = await User.findByPk(userId);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new message
    const newMessage = await ChatMessage.create({ userId, message });

    // Fetch the message with user details
    const messageWithUser = await ChatMessage.findByPk(newMessage.id, {
      include: [{ model: User, as: 'user', attributes: ['name'] }]
    });

    if (io) {
      io.emit('chatMessage', {
        id: messageWithUser.id,
        message: messageWithUser.message,
        userId: messageWithUser.userId,
        user: {
          name: messageWithUser.user.name, // Include the user name
        },
        createdAt: messageWithUser.createdAt,
        updatedAt: messageWithUser.updatedAt
      }); // Emit the full message object with user details
    }

    console.log("Emitting message with user:", messageWithUser); // Debugging log

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: messageWithUser, // Include full message details in response
    });
  } catch (error) {
    console.error("Error sending message:", error);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while sending the message",
      });
    }
  }
};

