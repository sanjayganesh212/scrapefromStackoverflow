var CryptoJS = require("crypto-js");
const bcrypt = require('bcrypt');
const xywcy = require('../config/production.js')

const scrtky =  xywcy.scrtky
const ebfiew = xywcy.fibwic

const saltRounds = xywcy.bcryptSalt;


module.exports = {

    encrypt : (data)=>{

        var ciphertext = CryptoJS.AES.encrypt(data, scrtky , {iv :ebfiew }).toString();
        return ciphertext

},

  decrypt : (ciphertext)=>{

    var bytes  = CryptoJS.AES.decrypt(ciphertext, scrtky , {iv :ebfiew });
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData

},

bcrypt_hashpass : async (value) => {
    try {

        const hashedPassword =  bcrypt.hashSync(value, 10);
        return hashedPassword;

    } catch (error) {
        console.log("console--->> ~ file: encryptDecrypt.js:29 ~ error:", error)
    
        throw new error ;
        
    }
 
  },

  comparePassword : async (userPassword  , password)=>{
    try {
    return bcrypt.compareSync(userPassword, password);
        
    } catch (error) {
        console.log("console--->> ~ file: encryptDecrypt.js:43 ~ error:", error)
        throw new error ;
    }
  }



}