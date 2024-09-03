const User = require('../model/chatUser');
const ChatMessage = require('../model/chatMessage');
const { Op } = require("sequelize");
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
      include: [{ model: User, as: "user", attributes: ["name"] }],
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while fetching messages" });
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

    const newMessage = await ChatMessage.create({ userId, message });
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while sending the message",
    });
  }
};
