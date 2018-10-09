var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
  major: {
    type: String,
    enum: [
      'Computer Science',
      'Information Systems']
  },
  minor: {
    type: String,
    enum: [
      'Intelligent Systems',
      'Information Security',
      'Other Minor']
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  // Phone number, with validated format
  phone_number: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{4}-\d{3}-\d{3}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  // GPA 1.0-7.0
  gpa: {
    type: Number,
    min: 1.0,
    max: 7.0
  },
  // Array of preffered industries
  preferred_industries: [{
    type: String,
    enum: [
      'Web Design',
      'OS Development',
      'Graphic Design',
      'Finance'
    ]
  }],
  hash: String,
  salt: String
}, {timestamps: true});

module.exports = mongoose.model('Student', StudentSchema);
