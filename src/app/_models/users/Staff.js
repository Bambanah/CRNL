const User = require('./User');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// eslint-disable-next-line no-unused-vars
const Staff = User.discriminator('Staff', new Schema({}));

module.exports = mongoose.model('Staff');
