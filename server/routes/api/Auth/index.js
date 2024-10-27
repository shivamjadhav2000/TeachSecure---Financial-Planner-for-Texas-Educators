// backend/routes/auth.js
const express = require('express');
const { signup, login } = require('@controllers/authController');
const validate = require('@middlewares/validate');
const router = express.Router();

// Signup route
router.post('/signup', validate.signup, signup);

// Login route
router.post('/login', validate.login, login);

module.exports = router;
