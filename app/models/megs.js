var mongoose = require('mongoose');
var MessageSchema = require('../schemas/megs');
var Message = mongoose.model('Message',MessageSchema);

module.exports = Message;