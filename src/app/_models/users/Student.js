const User = require('./User');
require('../Skill');
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
    minors: {
      first: String,
      second: String
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
