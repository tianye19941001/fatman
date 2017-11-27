var Diary = require('../models/diarys');
var Comment = require('../models/comment')
var _ = require('underscore');

exports.save = function(req,res) {
	var _diary = req.body.diary;
	var _new;

	Diary.count({},function(err,count){
		_diary.diaryId = 100001 + count;
	});

	Diary.findOne({title:_diary.title},function(err,diary){
		if (err) console.log(err);
		if (diary) {
			_new = _.extend(diary, _diary)
			_new.save(function(err,diary){
				if (err) console.log(err);
				res.redirect('/')
			})
		}else{
			var diary = new Diary(_diary);
			diary.save(function(err,diary){
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
	Diary.count({},function(err,count){
		var allnum = Math.ceil(count/4);
		if (num == 0) num = 1;
		if (num > allnum) num = allnum;
		for (var i = 1,Anum = []; i <= allnum; i++) {
			Anum.push(i);
		}
		Diary.find({}).sort({_id: -1}).limit(number).skip((num-1)*number).exec(function(err,diarys){
			res.render('diary',{
				diarys:diarys,
				numbers:Anum,
				now:parseInt(num)
			})
		})
	});
}
exports.con = function(req,res){
	var diaryId = parseInt(req.query.diaryId);
	
	Diary.findOne({diaryId:diaryId},function(err,diary){
		if (err) console.log(err);
		Comment
			.find({article: diaryId})
			.populate('from','name')
			.populate('reply.from reply.to','name')
			.exec(function(err, comments){
			if (err) {
				console.log(err)
			}
			res.render('diary_in',{
				title: diary.title,
				diary: diary,
				comments: comments
			})

		})
	})
}
exports.pagediary = function(req,res){
	res.render('admin_diary',{
		title:'文章后台页面'
	})
}
exports.pagelist = function(req,res){
	Diary.find({}).sort({_id: -1}).exec(function(err,diarys){
		res.render('admin_list',{
			title:'后台日记列表页面',
			type: 'diary',
			showList: diarys
		})
	})
}

exports.del = function(req,res){
	var id = req.query.id
	if(id){
		Diary.remove({_id:id},function(err,diary){
			if(err){
				console.log(err)
			}else{
				res.json({success:1})
			}
		})
	}
}
