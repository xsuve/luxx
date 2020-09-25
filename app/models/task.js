const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Task = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId
  },
  contactId: {
    type: mongoose.Schema.ObjectId
  },
  title: {
    type: String
  },
  deadline: {
    type: Date
  },
  type: {
    type: String
  },
  notes: {
    type: String
  },
  addDate: {
    type: Date
  },
  completed: {
    type: Boolean
  }
}, {
  collection: 'tasks'
});

module.exports = mongoose.model('Task', Task);
