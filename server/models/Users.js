// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  retirementAccounts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RetirementAccount',
  }],
  goals: {
    targetAmount: {
      type: Number,
      required: false,
      default: 0,
    },
    targetDate: {
      type: Date,
      required: false,
    },
  },
    currentSavings: {
        type: Number,
        default: 0,
    },
    age: {
        type: Number,
        required: false,
        default:0
    },
    retirementAge: {
        type: Number,
        required: false,
        default:0
    }
}, {
  timestamps: true,
});

mongoose.model('User', userSchema);
