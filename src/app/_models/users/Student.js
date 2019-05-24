const User = require('./User');
require('../Skill');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    invitations: {
      type: [
        {
          invitedById: {
            type: Schema.Types.ObjectId,
            ref: 'Student'
          },
          invitationType: {
            type: String,
            enum: ['create', 'add']
          }
        }
      ]
    }
  })
);

module.exports = mongoose.model('Student');
