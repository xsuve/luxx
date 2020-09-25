const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Note = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId
  },
  contactId: {
    type: mongoose.Schema.ObjectId
  },
  text: {
    type: String
  },
  addDate: {
    type: Date
  }
}, {
  collection: 'notes'
});

module.exports = mongoose.model('Note', Note);
