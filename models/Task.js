const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
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
    default: 1,
  },
  streak: {
    type: Number,
    default: 0,
  },
  streakDate: {
    type: Date,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('task', TaskSchema);
