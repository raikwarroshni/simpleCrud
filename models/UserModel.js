const {Schema, model} = require('mongoose');

const userModel = new Schema ({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
}, {timestamps: true});

module.exports = model('User', userModel, 'User');

