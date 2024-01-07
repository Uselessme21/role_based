
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access Forbidden: Admins only' });
    }
    next();
  };
  
  module.exports = { authorizeAdmin };
  