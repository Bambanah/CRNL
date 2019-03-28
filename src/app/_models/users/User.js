const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const options = {
  discriminatorKey: 'itemtype',
  collection: 'users'
};

const UserSchema = new Schema(
  {
    full_name: String,
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password: String
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  },
  options
);

UserSchema.pre('save', function(next) {
  // eslint-disable-next-line no-invalid-this
  const user = this;
  if (user.isModified('password') || user.isNew) {
    // eslint-disable-next-line no-invalid-this
    bcrypt.hash(this.password, saltRounds, function(err, hash) {
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

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

UserSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000)
    },
    'SECRET'
  ); // TODO: Move to environment variables
};

UserSchema.methods.isStudent = function() {
  return this.__t;
};

UserSchema.methods.isInTeam = function() {
  const user = this;

  if (!user.isStudent()) {
    console.info('User is not a student');
    return false;
  } else {
    return user.team ? true : false;
  }
};

UserSchema.methods.getTeamId = function() {
  const user = this;
  if (!this.isInTeam(user)) {
    throw new Error('User is not in a team');
  } else if (this.isInTeam(user)) {
    return this.team;
  }
};

module.exports = mongoose.model('User', UserSchema);
