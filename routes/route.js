require("dotenv").config();
const express = require("express");
const chatUsers = require("../controllers/chatUser");
const chatController = require("../controllers/chatController");
const groupController = require("../controllers/groupController");
const authMiddleWare = require("../middleware/auth");
const router = express.Router();

router.post("/signup", (req, res) => {
  chatUsers.signupUser(req, res);
});

router.post("/login", (req, res) => {
  chatUsers.loginUser(req, res);
});

router.post("/send-message", (req, res) => {
  chatController.sendMessage(req, res);
});

router.get("/messages", (req, res) => {
  chatController.getMessages(req, res);
});

router.get("/users", (req, res) => {
  chatController.getUsers(req, res);
});

// Group Routes
router.post("/groups", authMiddleWare, (req, res) => {
  groupController.createGroup(req, res);
});

router.post("/groups/:groupId/members", authMiddleWare, (req, res) => {
  groupController.addMember(req, res);
});

router.delete("/groups/:groupId/members/:userId", authMiddleWare, (req, res) => {
  groupController.removeMember(req, res);
});

router.post("/groups/:groupId/messages", authMiddleWare, (req, res) => {
  groupController.sendMessage(req, res);
});

router.get("/groups/:groupId/messages", authMiddleWare, (req, res) => {
  groupController.getMessages(req, res);
});

module.exports = router;
