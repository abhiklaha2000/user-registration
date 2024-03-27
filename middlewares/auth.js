const jwt = require('jsonwebtoken')
const RevokedToken = require("../models/revoked");

const authMiddleware = async (req, res, next) => {
    if(!req.headers.authorization){
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = req.headers.authorization.split(' ')[1] ?? null;

    const tokenRevoked = await RevokedToken.findOne({token});

    if(tokenRevoked){
      return res.status(401).json({ message: 'Authorization expired: Please re-login!' });
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    jwt.verify(token, 'secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      } else {
        req.user = decoded;
        next();
      }
    });
};

module.exports = authMiddleware;