
const express = require('express');
const adminController = require('../controllers/adminController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

const router = express.Router();

// Middleware to ensure only Admins can access these routes
router.use(
  authenticationMiddleware.authenticate,
  authorizationMiddleware.authorizeAdmin
);

// Get all users 
router.get('/users', adminController.getAllUsers);


// Delete a user 
router.delete(
  '/deleteuser/:userId',
 adminController.deleteUser
);

//Update a user
router.put(
  '/updateuser/:userId',
  adminController.updateUser
);

module.exports = router;

