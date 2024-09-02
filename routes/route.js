require("dotenv").config();
const express = require("express");
const chatUsers = require("../controllers/chatUser");
const chatController = require("../controllers/chatController")
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
module.exports = router;
