const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    unique: true,
  },
  credits: {
    type: Number,
    default: 0,
  },
});
const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
