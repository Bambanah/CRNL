const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['Skill', 'Language', 'Talent', 'Other'],
      required: true
    },
    description: {
      type: String,
      required: false
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
