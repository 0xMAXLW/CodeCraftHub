const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the User model with timestamps
const userSchema = new mongoose.Schema({
  // Username field
  username: {
    type: String,       // Data type is String
    required: true,     // This field is required
    unique: true,       // Username must be unique across all documents
    index: true,        // Create an index for the username field to improve search performance
  },
  // Password field
  password: {
    type: String,       // Data type is String
    required: true,     // This field is required
    minlength: 6,       // Minimum length for password (example: 6 characters)
  },
}, {
  timestamps: true,    // Automatically add `createdAt` and `updatedAt` fields
});

/**
 * Pre-save hook to hash the password before saving to the database.
 * This hook is executed before a document is saved.
 * - Only hashes the password if it has been modified or is new.
 * - Uses bcrypt to hash the password with a salt rounds of 10.
 * @param {Function} next - The next middleware function to call
 */
userSchema.pre('save', async function(next) {
  // Check if the password field has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Generate a salt with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    // Proceed to save the document
    next();
  } catch (error) {
    // Pass any errors to the next middleware
    next(error);
  }
});

// Create a Mongoose model for the User schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
