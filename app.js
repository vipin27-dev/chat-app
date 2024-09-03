// app.js
require('dotenv').config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");
require("./model/association"); 

const userRoutes = require("./routes/route");
const http = require('http');
const { setupSocket } = require('./socket'); 

const app = express();
const server = http.createServer(app);
const io = setupSocket(server); // Initialize socket.io with the server

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); 

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "signup.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "chat.html"));
});

app.get('/groups', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'group.html'));
});

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully.");
    server.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => {
    console.error("Error synchronizing the database:", err);
  });
