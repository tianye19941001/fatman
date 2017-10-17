var Article = require('../models/articles');

exports.index = function(req,res){
	Article.find({}).sort({_id: -1}).limit(3).exec(function(err,articles){
		res.render('index',{
			title:'小楼兰的奔跑-首页',
			articles:articles
		})
	})
}