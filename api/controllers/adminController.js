
const User = require('../models/users');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'Admin' });
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    const deletedUser= await User.findByIdAndDelete(userId);
   

    res.status(200).json({ message: 'User deleted successfully',deletedUser });
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

 
    userToUpdate.name = req.body.name || userToUpdate.name;
    userToUpdate.email = req.body.email || userToUpdate.email;
    userToUpdate.phone = req.body.phone || userToUpdate.phone;
    userToUpdate.profileImage = req.body.profileImage || userToUpdate.profileImage;
    userToUpdate.role = req.body.role || userToUpdate.role;

    // const updateuser=await User.findByIdAndUpdate({userId,req.body})
   const updateduser= await userToUpdate.save();

    res.status(200).json({ message: 'User updated successfully', updateduser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
