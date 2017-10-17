var Article = require('../models/articles');

exports.index = function(req,res){
	Article.find({}).sort({_id: -1}).limit(3).exec(function(err,articles){
		res.render('index',{
			title:'十里长廊旅游网',
			articles:articles
		})
	})
}
