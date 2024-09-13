const express = require('express');
require('dotenv').config();
const connectDB = require('./config/database');
const userRoutes = require('./src/routes/userRoutes');
const app = express();

/**
 * Connect to MongoDB using the configured connection function.
 */
connectDB();

/**
 * Middleware to parse incoming JSON request bodies.
 * This allows the app to handle JSON payloads in requests.
 */
app.use(express.json());

/**
 * Mounts the userRoutes router at the `/users` endpoint.
 * All routes defined in userRoutes will be prefixed with `/users`.
 */
app.use('/users', userRoutes);

/**
 * Define the port number for the server to listen on.
 * Port 3000 is used as a default if not specified otherwise.
 */
const port = 3000;

/**
 * Start the server and listen for incoming requests.
 * Logs a message to the console once the server is successfully started.
 */
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
