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
  },
  password: {
    type: String
  },
  otp: {
    type: String,
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

