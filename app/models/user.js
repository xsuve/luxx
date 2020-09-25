const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
  email: {
    type: String
  },
  fullName: {
    type: String
  },
  profile: {
    type: String
  },
  country: {
    type: String
  },
  signUpDate: {
    type: Date
  },
  token: {
    type: String
  },
  verified: {
    type: Boolean
  }
}, {
  collection: 'users'
});

module.exports = mongoose.model('User', User);
