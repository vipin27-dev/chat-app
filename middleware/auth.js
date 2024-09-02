const jwt = require('jsonwebtoken');
const User = require('../model/chatUser');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); 
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err.message);
            return res.sendStatus(403); 
        }

        try {
            const foundUser = await User.findByPk(decoded.userId);
            if (!foundUser) {
                return res.sendStatus(403); 
            }

            req.userId = decoded.userId; 
            next();
        } catch (dbError) {
            console.error('Database error:', dbError.message);
            return res.sendStatus(500); // Internal Server Error
        }
    });
};

module.exports = authenticateToken;
