var Article = require('../models/articles');
var _ = require('underscore');

exports.save = function(req,res) {
	var _article = req.body.article;
	var _new;
	Article.findOne({title:_article.title},function(err,article){
		if (err) console.log(err);
		if (article) {
			_new = _.extend(article, _article)
			_new.save(function(err,article){
				if (err) console.log(err);
				res.redirect('/')
			})
		}else{ 
			var article = new Article(_article);
			article.save(function(err,article){
				if (err) console.log(err);
				res.redirect('/');
			})
		}
	})
}

exports.all = function(req,res){
	var number = 4;
	var num = 1;
	if (req.query.number) {
		num = req.query.number;
	}
	Article.count({},function(err,count){
		var allnum = Math.ceil(count/4);
		if (num == 0) num = 1;
		if (num > allnum) num = allnum;
		for (var i = 1,Anum = []; i <= allnum; i++) {
			Anum.push(i);
		}
		Article.find({}).sort({_id: -1}).limit(number).skip((num-1)*number).exec(function(err,articles){
			res.render('article',{
				articles:articles,
				numbers:Anum,
				now:parseInt(num)
			})
		})
	});
}
exports.pagearticle = function(req,res){
	res.render('admin_article',{
		title:'文章后台页面'
	})
}
exports.pagelist = function(req,res){
	res.render('admin_list',{
		title:'后台列表页面'
	})
}