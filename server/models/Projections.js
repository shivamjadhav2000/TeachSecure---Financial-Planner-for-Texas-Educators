// models/Projection.js
const mongoose = require('mongoose');

const projectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  retirementAccounts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RetirementAccount',
  }],
  projectedBalance: {
    type: Number,
    required: true,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  scenario: {
    type: String,
    enum: ['default', 'adjusted'],
    default: 'default',
  },
  assumptions: {
    growthRate: {
      type: Number,
      default: 0.05,
    },
    monthlyContribution: {
      type: Number,
      required: true,
    },
  },
}, {
  timestamps: true,
});

mongoose.model('Projections', projectionSchema);
