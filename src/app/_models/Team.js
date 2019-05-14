const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      default: null
    },
    name_backup: {
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
    console.warn('Team already has four members');
  } else {
    team.members.push(id);
    team.save();
  }
};

TeamSchema.methods.removeMember = function(id) {
  const team = this;
  if (team.members.indexOf(id) < 0) {
    console.warn(`User (${id}) is not part of team (${team._id})`);
  } else {
    const idIndex = team.members.indexOf(id);
    team.members.splice(idIndex, 1);
    team.save();
  }
};

module.exports = mongoose.model('Team', TeamSchema);
