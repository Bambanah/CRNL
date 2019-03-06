const User = require('./User');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Student = User.discriminator(
  'Student',
  new Schema({
    major: {
      type: String,
      enum: ['Computer Science', 'Information Systems', 'Unspecified'],
      default: 'Unspecified'
    },
    minor: {
      type: String,
      enum: ['Intelligent Systems', 'User Experience', 'Unspecified'],
      default: 'Unspecified'
    },
    team: { type: Schema.Types.ObjectId, ref: 'Team' }
  })
);

module.exports = mongoose.model('Student');
