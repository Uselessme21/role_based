
const User = require('../models/users');

// User controller to delete their own profile
exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id;
   
    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    const deletedprofile=await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'Profile deleted successfully',deletedprofile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// User controller to update their own profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    userToUpdate.name = req.body.name || userToUpdate.name;
    userToUpdate.email = req.body.email || userToUpdate.email;
    userToUpdate.phone = req.body.phone || userToUpdate.phone;
    userToUpdate.profileImage = req.body.profileImage || userToUpdate.profileImage;
    userToUpdate.password = req.body.password || userToUpdate.password;

    // Save the updated user
   const updatedprofile= await userToUpdate.save();

    res.status(200).json({ message: 'Profile updated successfully',updatedprofile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
