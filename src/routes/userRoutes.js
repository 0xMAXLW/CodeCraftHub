const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/listusers', userController.getAllUsers);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/:username', userController.updateUserProfile);
router.get('/test', userController.Test)

module.exports = router;