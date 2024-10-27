// models/RetirementAccount.js
const mongoose = require('mongoose');

const retirementAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accountType: {
    type: String,
    enum: ['TRS', '403(b)', 'IRA'],
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  monthlyContribution: {
    type: Number,
    required: true,
  },
  annualGrowthRate: {
    type: Number,
    default: 0.05,  // assuming a default growth rate of 5%
  },
}, {
  timestamps: true,
});

mongoose.model('RetirementAccount', retirementAccountSchema);
