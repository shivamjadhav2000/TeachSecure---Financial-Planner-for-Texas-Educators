// backend/controllers/authController.js
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const responseHandler = require('@helpers/responseHandler');

// Signup
const signup = async (req, res) => {
  const { email, password } = req.body;
    console.log(req.body);
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return responseHandler.handleErrorResponse(res,400,'User already exists')

    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const newUser = await User.create({ email, password: hashedPassword, username: req.body.username, goals: req.body.goals });
    return responseHandler.handleSuccessResponse(res,'User created successfully')
  } catch (error) {
    return responseHandler.handleException(res,error)
  }
};

// Login
const login = async (req, res) => {
  const { username, password } = req.body;
    console.log(req.body);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return responseHandler.handleErrorResponse(res,400,'Invalid credentials')
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return responseHandler.handleErrorResponse(res,400,'Invalid credentials')
    }

    const newuser={
        _id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        username:user.username,
        email:user.email,
        bio:user.bio,
        email:user.email,
        goals:user.goals,
        retirementAge:user.retirementAge,
        age:user.age,
        currentSavings:user.currentSavings,
      }
      const token = jwt.sign(
        { user: newuser },  // Payload
        process.env.JWT_SECRET,  // Secret key
        { 
          expiresIn: '1h',  // Expiration time
          algorithm: 'HS256'  // Algorithm
        }
      );
      let data={}
      data._id=user._id
      data.email=user.email
        data.username=user.username
        data.firstName=user.firstName
        data.lastName=user.lastName

      data['token']=token
      data['profileImage']=user.profileImg?+user.profileImg:""
      data['bio']=user.bio
      data['goals']=user.goals
      data['retirementAge']=user.retirementAge
      data['age']=user.age
      data['currentSavings']=user.currentSavings     
    
    return responseHandler.handleSuccessObject(res,data)
  } catch (error) {
    console.log(error);
    return responseHandler.handleException(res,error)

  }
};


const setRetirementGoal = async (req, res) => {
  const { targetAmount, targetDate } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.retirementGoal = { targetAmount, targetDate };
    await user.save();

    res.status(200).json({
      message: 'Retirement goal set successfully',
      retirementGoal: user.retirementGoal
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {  };

module.exports = { signup, login,setRetirementGoal };
