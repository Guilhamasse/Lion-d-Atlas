const jwt = require('jsonwebtoken');
const formatRes = require('../helpers/formatRes');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json(formatRes('error', null, 'No token provided'));
    }

    const token = authHeader.split(' ')[1] || authHeader || null; // Bearer <token>

    jwt.verify(token, process.env.BACK_SECRET_KEY, async (err, decoded) => {
        if (err) return res.status(403).json(formatRes('error', null, 'Error while verifying the token'));
        try {
            const user = await User.findByPk(decoded.userId);
            if (!user) return res.status(404).json(formatRes('error', null, 'User not found'));
            req.user = user;
            next();
        } catch (error) {
            return res.status(500).json(formatRes('error', null, 'Internal Server Error'));
        }
    });
};
