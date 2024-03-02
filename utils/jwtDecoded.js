const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtDecoded(reqCookie) {
    const token = reqCookie;
    var id;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Failed to authenticate token" });
      }
      id = decoded.id;
    });
    return id;
  }

module.exports = { jwtDecoded };