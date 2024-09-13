const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * Route to get all users.
 * This route uses the GET method to retrieve a list of all users.
 * @route GET /users
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 */
router.get('/users', userController.getAllUsers);

/**
 * Route to register a new user.
 * This route uses the POST method to create a new user.
 * @route POST /register
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 */
router.post('/register', userController.registerUser);

/**
 * Route to login a user.
 * This route uses the POST method to authenticate a user and generate a JWT token.
 * @route POST /login
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 */
router.post('/login', userController.loginUser);

/**
 * Route to update a user's profile by username.
 * This route uses the PATCH method to update a user's profile information.
 * @route PATCH /users/:username
 * @param {Request} req - The Express request object, containing the username parameter in the URL
 * @param {Response} res - The Express response object
 */
router.patch('/:username', userController.updateUserProfile);

/**
 * Route for testing the server.
 * This route uses the GET method to check if the server is working.
 * @route GET /test
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 */
router.get('/test', userController.Test);

// Export the router to be used in other parts of the application
module.exports = router;
