const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


var StudentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: {
    type: Number,
    default: null
  },
  major: {
    type: String,
    enum: [
      'Computer Science',
      'Information Systems',
      'Unspecified'
    ],
    default: 'Unspecified'
  },
  minor: {
    type: String,
    enum: [
      'Intelligent Systems',
      'Information Security',
      'Unspecified'
    ],
    default: 'Unspecified'
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
      validator: function (v) {
        return /\d{4}-\d{3}-\d{3}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  // GPA 1.0-7.0
  gpa: {
    type: Number,
    min: 1.0,
    max: 7.0,
    default: null
  },
  // Array of preffered industries
  preferred_industries: [{
    type: String,
    enum: [
      'Web Design',
      'OS Development',
      'Graphic Design',
      'Finance',
      'Unspecified'
    ],
    default: 'Unspecified'
  }],
  password: String
}, {
  timestamps: true
});

StudentSchema.virtual('full_name').get(function () {
  return this.first_name + this.last_name;
});

StudentSchema.pre('save', function (next) {
  const student = this;
  if (student.isModified('password') || student.isNew) {
    bcrypt.hash(this.password, saltRounds, function (err, hash) {
      if (err) {
        return next(err);
      }
      student.password = hash;
      next();
    });
  } else {
    return next();
  }
});

StudentSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Student', StudentSchema);
