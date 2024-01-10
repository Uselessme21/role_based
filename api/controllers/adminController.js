
const User = require('../models/users');
const fs= require('fs');
// Get all users
const path = require('path');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    
    // Map the users to include profile image URLs
    const usersWithProfileImages = users.map(user => ({
      _id: user._id,
      email: user.email,
      phone: user.phone,
      name: user.name,
      profileImage: path.join(req.protocol + '://' + `${req.get('host')}/uploads/${user.profileImage}`).replace(/\\/g, '/'),
      role: user.role,
    }));

    res.json(usersWithProfileImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// delete any user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    // Remove profile photo from local system
    if (userToDelete.profileImage) {
      const imagePath = path.join(__dirname, '../../uploads', userToDelete.profileImage);
      
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting profile image:', err);
        } else {
          console.log('Profile image deleted successfully');
        }
      });
    }

    res.status(200).json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Admin controller to update a user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;


    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }
    userToUpdate.email = req.body.email || userToUpdate.email;
    userToUpdate.phone = req.body.phone || userToUpdate.phone;
    userToUpdate.role = req.body.role || userToUpdate.role;

    // const updateuser=await User.findByIdAndUpdate({userId,req.body})
   const updateduser= await userToUpdate.save();

    res.status(200).json({ message: 'User updated successfully', updateduser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
