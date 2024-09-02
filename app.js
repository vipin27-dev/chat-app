require('dotenv').config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");
const userRoutes = require("./routes/route");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch(err => {
    console.error('Error synchronizing the database:', err);
  });
