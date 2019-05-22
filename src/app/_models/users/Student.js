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
      type: [
        {
          type: String,
          default: ''
        }
      ],
      validate: [arrayLimit, 'Can only have maximum two (2) minors']
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

// eslint-disable-next-line require-jsdoc
function arrayLimit(val) {
  return val.length <= 2;
}

module.exports = mongoose.model('Student');
