const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId
  },
  companyId: {
    type: mongoose.Schema.ObjectId
  },
  companyPosition: {
    type: String
  },
  stage: {
    type: String
  },
  fullName: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  country: {
    type: String
  },
  address: {
    type: String
  },
  facebook: {
    type: String
  },
  linkedin: {
    type: String
  },
  twitter: {
    type: String
  },
  instagram: {
    type: String
  },
  github: {
    type: String
  },
  youtube: {
    type: String
  }
}, {
  collection: 'contacts'
});

module.exports = mongoose.model('Contact', Contact);
