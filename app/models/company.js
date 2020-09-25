const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Company = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId
  },
  image: {
    type: String
  },
  industry: {
    type: String
  },
  name: {
    type: String
  },
  website: {
    type: String
  },
  numberOfEmployees: {
    type: Number
  },
  annualRevenue: {
    type: Number
  }
}, {
  collection: 'companies'
});

module.exports = mongoose.model('Company', Company);
