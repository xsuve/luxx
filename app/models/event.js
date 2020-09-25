const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId
  },
  contactId: {
    type: mongoose.Schema.ObjectId
  },
  title: {
    type: String
  },
  startDateTime: {
    type: Date
  },
  endDateTime: {
    type: Date
  },
  type: {
    type: String
  },
  addDate: {
    type: Date
  }
}, {
  collection: 'events'
});

module.exports = mongoose.model('Event', Event);
