var Img = require('../models/imgs');
var _ = require('underscore');

exports.save = function(req,res) {
	var _img = req.body.img;
	var _new;

	Img.findOne({title:_img.title},function(err,img){
		if (err) console.log(err);
		if (img) {
			_new = _.extend(img, _img)
			_new.save(function(err,img){
				if (err) console.log(err);
				res.redirect('/')
			})
		}else{
			var img = new Img(_img);
			img.save(function(err,img){
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
	Img.count({},function(err,count){
		var allnum = Math.ceil(count/4);
		if (num == 0) num = 1;
		if (num > allnum) num = allnum;
		for (var i = 1,Anum = []; i <= allnum; i++) {
			Anum.push(i);
		}
		Img.find({}).sort({_id: -1}).limit(number).skip((num-1)*number).exec(function(err,imgs){
			res.render('img',{
				imgs:imgs,
				numbers:Anum,
				now:parseInt(num)
			})
		})
	});
}

exports.pageimg = function(req,res){
	res.render('admin_img',{
		title:'文章后台页面'
	})
}
exports.pagelist = function(req,res){
	Img.find({}).sort({_id: -1}).exec(function(err,imgs){
		res.render('admin_list',{
			title:'后台图片列表页面',
			type: 'img',
			showList: imgs
		})
	})
}

exports.del = function(req,res){
	var id = req.query.id
	if(id){
		Img.remove({_id:id},function(err,img){
			if(err){
				console.log(err)
			}else{
				res.json({success:1})
			}
		})
	}
}
