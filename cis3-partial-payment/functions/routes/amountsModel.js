const mongoose = require('mongoose');

const amountPrimary = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
  amount: {
    type: String,
  },
  ID: {
    type: String,
  },
  name: {
      type: String
  }
});

const Amounts = mongoose.model('amounts', amountPrimary);

module.exports = Amounts;
