// backend/middlewares/validate.js
const { check, validationResult } = require('express-validator');

const signup = [
    check('email').isEmail().withMessage('Must be a valid email'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    check('username').exists().withMessage('Username is required'),
    check('goals.targetDate')
      .exists()
      .withMessage('Target date is required')
      .isISO8601()
      .withMessage('Target date must be a valid date in YYYY-MM-DD format'),
    check('goals.targetAmount')
      .exists()
      .withMessage('Target amount is required')
      .isNumeric()
      .withMessage('Target amount must be a number'),
  ];

const login = [
  check('email').isEmail().withMessage('Must be a valid email'),
  check('password').exists().withMessage('Password is required'),
];

// Validation rules
const validateRetirementGoal = [
  check('targetAmount').isNumeric().withMessage('Target amount must be a valid number'),
  check('targetDate').isISO8601().withMessage('Target date must be a valid date'),
  check('retirementAge').isNumeric().withMessage('Retirement age must be a valid number'),
    check('currentAge').isNumeric().withMessage('Current age must be a valid number'),
    check('userName').isString().withMessage('Username must be a valid string'),
    check('currentSavings').isNumeric().withMessage('Current savings must be a valid number')

];


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { signup, login,validateRetirementGoal, validate };
