const {Schema, model} = require('mongoose');
var validator = require('validator');

const userModel = new Schema ({
  firstName: {
    type: String,
    trim:true
  },
  lastName: {
    type: String,
    trim:true
  },
  email: {
    type: String,
    required:true,
    unique:true,
    lowercase:true,
    validate(value){
   if(validator.isEmail(value)){
     throw new error("emai; is invalid")
   }
    }
  },
  password: {
    type: String
  },
  otp: {
    type: String,
    validate(value){
      if(value<0){
        throw new error ("otp can not be null")
      }
    }
  },
  token: {
    type: String
  },
  isActive: {
    type: Boolean,
    default:false
  }
}, {timestamps: true});

module.exports = model('User', userModel, 'User');

