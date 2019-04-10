const User = require('./User');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// eslint-disable-next-line no-unused-vars
User.discriminator(
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
    tags: {
      // TODO: Create tag model to hold total number of students using that tag for use in returning most popular tags first
      type: Array
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    }
  })
);

module.exports = mongoose.model('Student');
