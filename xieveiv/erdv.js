
const mongoose = require('mongoose');
const ervrew = require('../config/production.js')
const helper = require('../helper/encryptDecrypt.js')


let dbstring = helper.decrypt(ervrew.mongodbConnectivityString)|| 'mongodb://localhost:27017/stackoverflow' ; 

async function connectToDatabase() {
         try {

           await mongoose.connect(dbstring, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 });

           console.log('Server Connected to the database using Mongoose ORM ');

       

         } catch (error) {

           console.error('Error connecting to the database:', error);

         }
       }
       
connectToDatabase();

mongoose.connection.on('open', () => console.log('db open'));
mongoose.connection.on('disconnected', (err) => console.log('db disconnected' , err));
mongoose.connection.on('reconnected', (err) => console.log('db trying to reconnected' , err));
mongoose.connection.on('disconnecting', (err) => console.log('db disconnecting' , err));
mongoose.connection.on('close', (err) => console.log(' db is close',err));