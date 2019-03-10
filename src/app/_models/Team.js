const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema(
  {
    name: {
      type: String
    },
    bio: String,
    members: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Student'
        }
      ],
      validate: [arrayLimit, '{PATH} exceeds the 4 limit']
    }
  },
  {
    timestamps: true
  }
);

// eslint-disable-next-line require-jsdoc
function arrayLimit(val) {
  return val.length <= 4;
}

TeamSchema.methods.addMember = function(id) {
  const team = this;
  if (team.members.length >= 4) {
    throw new Error('Team already has four members');
  } else {
    team.members.push(id);
    team.save();
  }
};

module.exports = mongoose.model('Team', TeamSchema);
