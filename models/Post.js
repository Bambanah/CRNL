var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    message: String,
    author: String
}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema);
