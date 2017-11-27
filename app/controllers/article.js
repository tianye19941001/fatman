var Article = require('../models/articles');
var Comment = require('../models/comment')
var _ = require('underscore');

exports.save = function(req,res) {
	var _article = req.body.article;
	var _new;

	Article.count({},function(err,count){
		_article.articleId = 200001 + count;
	});

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
	var number = 8;
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
exports.con = function(req,res){
	var articleId = parseInt(req.query.articleId);
	
	Article.findOne({articleId:articleId},function(err,article){
		if (err) console.log(err);
		Comment
			.find({article: articleId})
			.populate('from','name')
			.populate('reply.from reply.to','name')
			.exec(function(err, comments){
			if (err) {
				console.log(err)
			}
			res.render('article_in',{
				title: article.title,
				article: article,
				comments: comments
			})

		})
	})
}
exports.pagearticle = function(req,res){
	res.render('admin_article',{
		title:'文章后台页面'
	})
}
exports.pagelist = function(req,res){
	Article.find({}).sort({_id: -1}).exec(function(err,articles){
		res.render('admin_list',{
			title:'后台新闻列表页面',
			type: 'article',
			showList: articles
		})
	})
}

exports.del = function(req,res){
	var id = req.query.id
	if(id){
		Article.remove({_id:id},function(err,article){
			if(err){
				console.log(err)
			}else{
				res.json({success:1})
			}
		})
	}
}
