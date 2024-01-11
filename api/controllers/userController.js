const User = require("../models/users");
const fs = require("fs");
const path = require("path");

// User controller to view their own profile
exports.viewProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const userprofile = await User.findById(userId);
    if (!userprofile) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = {
      _id: userprofile._id,
      email: userprofile.email,
      phone: userprofile.phone,
      name: userprofile.name,
      profileImage: path
        .join(
          req.protocol +
            "://" +
            `${req.get("host")}/uploads/${userprofile.profileImage}`
        )
        .replace(/\\/g, "/"),
      role: userprofile.role,
    };

    res.status(200).json({ message: "user profile", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// User controller to delete their own profile
exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    const deletedprofile = await User.findByIdAndDelete(userId);
    // Remove profile photo from local system
    if (userToDelete.profileImage) {
      const imagePath = path.join(
        __dirname,
        "../../uploads",
        userToDelete.profileImage
      );

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting profile image:", err);
        } else {
          console.log("Profile image deleted successfully");
        }
      });
    }
    res
      .status(200)
      .json({ message: "Profile deleted successfully", deletedprofile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// User controller to update their own profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }
 // Remove profile photo from local system
 if (req.file.filename) {
   const imagePath = path.join(
    __dirname,
    "../../uploads",
    userToUpdate.profileImage
  );
   fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Error deleting profile image:", err);
    } else {
      console.log("Profile image deleted successfully");
    }
  });
}
    userToUpdate.name = req.body.name || userToUpdate.name;
    userToUpdate.profileImage = req.file.filename || userToUpdate.profileImage;
// console.log(req.file.filename)
    // Save the updated user
    const updatedprofile = await userToUpdate.save();
   
    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedprofile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
