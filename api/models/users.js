const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  phone: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
});

userSchema.methods.hashPassword = function () {
  this.password = bcrypt.hashSync(this.password, 10);
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
