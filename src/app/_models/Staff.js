const User = require('./User');
const Schema = mongoose.Schema;

const Staff = User.discriminator('Staff',
  new Schema({
    isAdmin: {
      type: Boolean,
      default: false
    }
  }));


module.exports = mongoose.model('Staff');
