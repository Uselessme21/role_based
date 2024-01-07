const express = require('express');
const userController = require('../controllers/userController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

const router = express.Router();
router.use(
    authenticationMiddleware.authenticate
  );
// User route to delete their own profile
router.delete(
  '/deleteprofile',
 userController.deleteProfile
);

// User route to update their own profile
router.put(
  '/updateprofile',
  userController.updateProfile
);

module.exports = router;
