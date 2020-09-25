const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Pipeline = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId
  },
  title: {
    type: String
  },
  contacts: {
    type: []
  }
}, {
  collection: 'pipelines'
});

module.exports = mongoose.model('Pipeline', Pipeline);
