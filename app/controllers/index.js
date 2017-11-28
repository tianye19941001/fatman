var Article = require('../models/articles');
var Diary = require('../models/diarys');

exports.index = function(req,res){
	Article.find({}).sort({_id: -1}).limit(8).exec(function(err,articles){
		Diary.find({}).sort({_id: -1}).limit(8).exec(function(err,diarys){
			var bannars = diarys.slice(0,3);
			res.render('index',{
				title:'百里画廊旅游网',
				articles:articles,
				diarys: diarys,
				bannars: bannars
			})
		});
	});
}
