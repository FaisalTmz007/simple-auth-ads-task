const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// authorization middleware from cookie
function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized' });
    }
}

module.exports = { authMiddleware };