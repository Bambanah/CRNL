const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TeamSchema = new Schema(
  {
    team_name: {
      type: String
    },
    team_bio: String,
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

function arrayLimit(val) {
  return val.length <= 4;
}

module.exports = mongoose.model('Team', TeamSchema);
