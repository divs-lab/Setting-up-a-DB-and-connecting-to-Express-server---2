const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,  // Removes leading/trailing spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures emails are unique
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,6}$/  // Regex to validate email format
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  // Minimum length for password
  },
  age: {
    type: Number,
    min: 18,  // Minimum age
    max: 100, // Maximum age
  }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
