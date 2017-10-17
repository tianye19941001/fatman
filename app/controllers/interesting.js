var Interesting = require('../models/interestings');
var multer  = require('multer')
var upload = multer({ dest: 'upload/' });
var _ = require('underscore');
var fs = require("fs");

exports.all = function(req,res){
	res.render('interesting');
}
exports.pageinteresting = function(req,res){
	res.render('admin_interesting',{
		title:'小玩意后台页面'
	})
}

exports.save = function(req,res){
	var file = req.file;
	var _interesting = req.body.interesting;
	_interesting.where = req.file.path;
	var _new;
	Article.findOne({title:_interesting.title},function(err,interesting){
		if (err) console.log(err);
		if (interesting) {
			_new = _.extend(interesting, _interesting)
			_new.save(function(err,interesting){
				if (err) console.log(err);
				res.redirect('/')
			})
		}else{ 
			var interesting = new Article(_interesting);
			interesting.save(function(err,interesting){
				if (err) console.log(err);
				res.redirect('/');
			})
		}
	})
	console.log(file);
}
exports.gameLight = function(req,res){
	res.render('game_light');
}