const User = require('../model/chatUser');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign({ userId: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({
          success: true,
          token,
          userId: user.id,
          name: user.name
      });
  } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ message: 'An error occurred during login' });
  }
};

  exports.signupUser = async (req, res) => {
    const { name, email, password, phno } = req.body; 
  
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await User.create({ name, phno, email, password: hashedPassword });  
      return res.status(201).json({ success: true, message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error during signup:', error.message); 
      return res.status(500).json({ success: false, message: 'An error occurred during signup.' });
    }
  };
  
