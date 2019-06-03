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
    name: {
      first: {
        type: String,
        default: ''
      },
      last: {
        type: String,
        default: ''
      }
    },
    posts: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Post'
        }
      ]
    },
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
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
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

UserSchema.virtual('full_name').get(function() {
  // eslint-disable-next-line no-invalid-this
  if (this.name !== undefined) {
    // eslint-disable-next-line no-invalid-this
    return this.name.first + ' ' + this.name.last;
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
  );
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

UserSchema.methods.inviteTeam = function(type, invitedById) {
  if (this.__t != 'Student') {
    return 'User is not a student';
  } else if (type == 'create' || type == 'add') {
    const invitation = {
      invitedById: invitedById,
      invitationType: type
    };

    this.invitations.push(invitation);
    this.save();

    return true;
  } else {
    console.warn('No invitation type specified');
    return false;
  }
};

module.exports = mongoose.model('User', UserSchema);
