const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  entry: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Journal', journalSchema);

