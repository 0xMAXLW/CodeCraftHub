const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const secretKey = process.env.SECRET_KEY;

// Controller functions for user operations

/**
 * Retrieves all users from the database.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json(users); // Respond with users in JSON format
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' }); // Handle errors
  }
};

/**
 * Registers a new user.
 * Validates input and hashes the password before saving the user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.registerUser = [
  // Input validation rules
  body('username').isString().trim().notEmpty(),
  body('password').isString().trim().isLength({ min: 6 }),
  
  async (req, res) => {
    try {
      const errors = validationResult(req); // Check for validation errors
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Respond with validation errors
      }

      const { username, password } = req.body;

      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' }); // Respond with conflict error
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' }); // Respond with success
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  }
];

/**
 * Logs in a user by verifying credentials and generating a JWT.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid username or password' }); // Respond with unauthorized error
    }

    // Verify the password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid username or password' }); // Respond with unauthorized error
    }

    // Generate a JSON Web Token (JWT)
    const token = jwt.sign({ username: existingUser.username }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token }); // Respond with JWT
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' }); // Handle errors
  }
};

/**
 * Updates the user's profile by changing their username.
 * Ensures the new username does not already exist.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateUserProfile = async (req, res) => {
  try {
    const { username } = req.params; // Current username from URL parameters
    const { newUsername } = req.body; // New username from request body

    // Check if the newUsername already exists
    const existingUser = await User.findOne({ username: newUsername });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' }); // Respond with conflict error
    }

    // Update the user's username
    await User.updateOne({ username }, { username: newUsername });

    res.status(200).json({ message: 'User profile updated successfully' }); // Respond with success
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' }); // Handle errors
  }
};

/**
 * Test endpoint to check if the server is running.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.Test = async (req, res) => {
  res.send('Server is working!'); // Respond with a simple message
};
