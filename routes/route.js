require('dotenv').config(); 
const express = require("express");
const chatController = require('../controllers/chatUser');

const authMiddleWare = require('../middleware/auth');
const router = express.Router();

router.post("/signup",(req,res)=>{
    chatController.signupUser(req,res);
});

module.exports = router;