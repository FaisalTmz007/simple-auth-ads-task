const jwt = require('jsonwebtoken');

// Max Expire Time
const maxExpire = 3 * 24 * 60 * 60; // 3 Days in Seconds

// Create Token
function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: maxExpire
    });
}

module.exports = { maxExpire, createToken };