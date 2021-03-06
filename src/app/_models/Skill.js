const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['language', 'framework', 'talent', 'other'],
      required: true
    },
    members: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Student'
        }
      ],
      required: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Skill', SkillSchema);
