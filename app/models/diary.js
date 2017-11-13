var mongoose = require('mongoose');
var DiarySchema = require('../schemas/diary');
var Diary = mongoose.model('Diary',DiarySchema);

module.exports = Diary;