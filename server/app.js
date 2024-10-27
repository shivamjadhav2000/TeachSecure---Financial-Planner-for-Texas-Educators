require('module-alias/register')

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose')

mongoose.set("strictQuery", false);
mongoose.promise = global.Promise

const dotenv =require('dotenv');
dotenv.config()
const app = express();

app.use(express.json())
app.use(cors());


require('./config/database')

require('./models/Users')
// const logRequest = require('@middleware/logrequest'); // Adjust the path as needed
// app.use(logRequest);
app.use(require('./routes'))

// Start the server
app.listen(process.env.PORT, async function () {
  try{
    console.log('Server listening on port ',process.env.PORT);
  }
  catch(err){
    console.log(err)
    console.log('server could not be started')
  }
  
});
  