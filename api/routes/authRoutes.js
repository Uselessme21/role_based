const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const validationMiddleware = require('../middlewares/validationMiddleware');
const upload =require('../services/multerSetup')

const router = express.Router();
// signup
// Set up Multer for image uploads


router.post(
  '/signup',
  upload,
  (req, res, next) => {
   
    const validationRules = [];
    if (req.body.email) {
      validationRules.push(body('email').isEmail());
    }
    if (req.body.phone) {
      validationRules.push(body('phone').isMobilePhone());
    }
    validationRules.push(body('name').trim().notEmpty());
    validationRules.push(body('password').isLength({ min: 6 }));
    validationMiddleware.validate(req, res, next, validationRules);
  },
  authController.signup
);

// login
router.post(
  '/login',
  (req, res, next) => {
   console.log(req.body)
    const validationRules = [];
    if (req.body.email) {
      validationRules.push(body('email').isEmail());
    }
    if (req.body.phone) {
      validationRules.push(body('phone').isMobilePhone());
    }

    validationRules.push(body('password').isLength({ min: 6 }));
    validationMiddleware.validate(req, res, next, validationRules);
  },
  authController.login
);



module.exports = router;
