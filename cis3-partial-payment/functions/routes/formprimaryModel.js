const mongoose = require('mongoose');

const formPrimary = new mongoose.Schema({
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
  confirmationID: {
    type: String,
  },
  name: { type: String },
});

const Formprimary = mongoose.model('formprimary', formPrimary);

module.exports = Formprimary;
