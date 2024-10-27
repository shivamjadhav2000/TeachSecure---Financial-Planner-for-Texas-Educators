const express = require('express')
const responseHandler=require('@helpers/responseHandler')
const router = express.Router()
const {auth} = require('@middlewares/jwtToken')
console.log('auth',auth)
router.use('/auth', require('./Auth'))

// router.get('/heartbeat', (req, res) => {
//   try{
//   const decode=verifyToken(req,res)
//   if(decode){
//       return responseHandler.handleSuccessResponse(res,  'API is working',200);
//   }
//   return responseHandler.handleErrorResponse(res, 401, 'Invalid Token');
//   }
//   catch(err){
//       console.log(err)
//       return responseHandler.handleErrorResponse(res, 401, 'Invalid Token');
//   }
// });

router.use((req, res, next) => {
    auth()(req, res, next);
  });
router.use('/common',require('./Common'))
// Catch-all route for undefined routes
router.use((req, res) => {
    // Respond with a 404 status code and a message
    return responseHandler.handleErrorResponse(res,404,'Route not found')
  });
module.exports = router