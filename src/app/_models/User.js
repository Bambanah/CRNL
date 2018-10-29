const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: String
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

UserSchema.virtual('full_name').get(function () {
  return this.first_name + ' ' + this.last_name;
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password') || user.isNew) {
    bcrypt.hash(this.password, saltRounds, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "SECRET"); // TODO Move to environment variables
};

module.exports = mongoose.model('User', UserSchema);
