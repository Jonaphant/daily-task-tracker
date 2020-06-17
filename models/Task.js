const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isRepeating: {
    type: Boolean,
    default: false,
  },
  repeatOccurence: {
    type: Number,
    default: 0,
  },
  streak: {
    type: Number,
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('task', TaskSchema);
