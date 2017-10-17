var mongoose = require('mongoose');
var ArticleSchema = require('../schemas/articles');
var Article = mongoose.model('Article',ArticleSchema);

module.exports = Article;