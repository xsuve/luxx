const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Invoice = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId
  },
  contactId: {
    type: mongoose.Schema.ObjectId
  },
  number: {
    type: Number
  },
  value: {
    type: Number
  },
  paid: {
    type: Boolean
  },
  dueDate: {
    type: Date
  },
  addDate: {
    type: Date
  }
}, {
  collection: 'invoices'
});

module.exports = mongoose.model('Invoice', Invoice);
