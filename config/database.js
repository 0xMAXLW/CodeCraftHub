const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

/**
 * Connects to MongoDB using Mongoose.
 * - Uses `mongoURI` from environment variables to establish the connection.
 * - Configures Mongoose with `useNewUrlParser` and `useUnifiedTopology` options to avoid deprecation warnings.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB with the provided URI
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,       // Use the new URL parser to avoid deprecation warnings
      useUnifiedTopology: true,   // Use the new Server Discover and Monitoring engine
    });
    console.log('MongoDB connected successfully'); // Log success message on successful connection
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message); // Log error message if connection fails
    process.exit(1); // Exit the process with a failure code
  }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;
