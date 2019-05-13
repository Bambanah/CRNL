const User = require('./User');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// eslint-disable-next-line no-unused-vars
User.discriminator(
  'Student',
  new Schema({
    major: {
      type: String,
      enum: ['Computer Science', 'Information Systems', ''],
      default: ''
    },
    minor: {
      type: String,
      enum: ['Intelligent Systems', 'User Experience', ''],
      default: ''
    },
    skills: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Skill'
        }
      ]
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    }
  })
);

module.exports = mongoose.model('Student');
