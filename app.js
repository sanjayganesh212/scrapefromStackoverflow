
var http= require('http')
const express = require("express");
const rateLimit = require('express-rate-limit');
const cors = require("cors");
const xycjw = require('./config/production.js') //  file will be obfuscated and will be in server also in git ignore
var encryptDrycpt = require('./helper/encryptDecrypt.js')
var dbconnection = require('./xieveiv/erdv.js')
var dbfile = require('./models/toptags.js')
// var scrapfile = require('./scrap.js') 

// routes 
var scraproute = require('./router/scrapdata.js')

require('dotenv').config();
const app = express();




app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);

app.use('/scrapdata' , scraproute)



var PORT = xycjw.PORT|| 8080 ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
