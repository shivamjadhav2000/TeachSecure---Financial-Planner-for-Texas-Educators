const express = require('express')
const router = express.Router()
const {profileUpdate,setRetirementGoal} = require('@controllers/userController')
router.post('/profile-update',profileUpdate)
router.post('/set-goal',setRetirementGoal)
module.exports = router