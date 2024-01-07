
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authenticate = async (req, res, next) => {

  const token = req.header('Authorization');
 
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing Token' });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

   
    const user = await User.findById(decoded.userId);

    
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid User' });
    }

   
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized: Invalid Token' });
  }
};

module.exports = { authenticate };
