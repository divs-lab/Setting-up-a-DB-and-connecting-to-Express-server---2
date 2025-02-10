const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./users');  // Import the User model

dotenv.config();  // Load environment variables from .env file

const app = express();
app.use(express.json());  // Middleware to parse JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to database');
})
.catch((error) => {
  console.error('Error connecting to database', error);
});

// POST API to create a new user
app.post('/api/users', async (req, res) => {
  const { name, email, password, age } = req.body;

  try {
    // Create a new user instance
    const user = new User({ name, email, password, age });

    // Save the user to the database
    await user.save();

    // Return success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Handle validation or server errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: `Validation error: ${error.message}` });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
