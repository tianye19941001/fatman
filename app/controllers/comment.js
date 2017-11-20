var Comment = require('../models/comment')
// comment
exports.save = function(req,res){
	var _comment = req.body.comment;
	var articleId = _comment.article;

	var urlLast = _comment.type == 'diary' ? '/diary_in?diaryId=' : '/article_in?articleId=';
		
	if (_comment.cid) {
		Comment.findById(_comment.cid,function(err,comment){
			if (err) console.log(err)
			var reply = {
				from: _comment.from,
				to: _comment.tid,
				content: _comment.content
			}
			
			comment.reply.push(reply)

			comment.save(function(err,comment){
				if (err) {
					console.log(err)
				}
			})
		})
	}else{
		var comment = new Comment(_comment)

		comment.save(function(err,comment){
			if (err) {
				console.log(err)
			}
		})
	}
	res.redirect( urlLast + articleId)
}

