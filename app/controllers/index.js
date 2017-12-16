var Article = require('../models/articles');
var Diary = require('../models/diarys');
var Img = require('../models/imgs');

exports.index = function(req,res){
	Article.find({}).sort({_id: -1}).limit(8).exec(function(err,articles){
		Img.find({}).sort({_id: -1}).limit(8).exec(function(err,imgs){
			Diary.find({}).sort({_id: -1}).limit(8).exec(function(err,diarys){
				var bannars = diarys.slice(0,3);
				res.render('index',{
					title:'百里画廊旅游网',
					articles:articles,
					diarys: diarys,
					imgs: imgs,
					bannars: bannars
				})
			});
		});
	});
}
