const express =require('express')
const router=express.Router()
const responseHandler=require('@helpers/responseHandler')

router.use('/users',require('./users'))




// Catch-all route for undefined routes
router.use((req, res) => {
    // Respond with a 404 status code and a message
    return responseHandler.handleErrorResponse(res,404,'Route  not found')
  });
module.exports=router