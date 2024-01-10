const { validationResult } = require('express-validator');
const jwtUtils = require('../utils/jwtUtils');
const User = require('../models/users');
const bcrypt = require('bcrypt');

// signup users
exports.signup = async (req, res) => {
  try {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });
console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: 'Email or phone already in use' });
    }



    const user = new User({
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
      password: req.body.password,
      profileImage:req.file.filename,
      role:req.body.role
    });
  
    user.hashPassword();
  // Save profile image to local system

  console.log(user)
  
    await user.save();

    // Generate JWT token
    const token = jwtUtils.generateToken(user);

    res.status(201).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// login users and admins
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwtUtils.generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
