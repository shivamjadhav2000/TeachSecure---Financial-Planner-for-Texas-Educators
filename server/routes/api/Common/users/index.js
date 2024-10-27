const express = require('express')
const router = express.Router()
const {profileUpdate} = require('@controllers/userController')
router.post('/profile-update',profileUpdate)
module.exports = router