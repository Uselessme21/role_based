const express = require('express');
const userController = require('../controllers/userController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const upload =require('../services/multerSetup')
const router = express.Router();
router.use(
    authenticationMiddleware.authenticate
  );

  // User route to view their own profile
router.get('/viewprofile', userController.viewProfile);

// User route to delete their own profile
router.delete('/deleteprofile', userController.deleteProfile);

// User route to update their own profile
router.put( '/updateprofile', upload, userController.updateProfile );



module.exports = router;
