var Message = require('../models/megs');

exports.save = function(req,res) {
	var _meg = req.body.message;
	var message = new Message(_meg);
	message.save(function(err,message){
		if (err) console.log(err);
		res.redirect('/connect')
	})
}
exports.see = function(req,res){
	Message.find({}).populate("name","name").exec(function(err,messages){
		res.render('connect',{
			title:"小楼兰的奔跑-留言",
			messages:messages
		})
	})
}