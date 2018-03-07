var fs = require("fs");
var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Comment = require('../app/controllers/comment');
var Article = require('../app/controllers/article');
var Diary = require('../app/controllers/diary');
var Message = require('../app/controllers/meg');
var Other = require('../app/controllers/otherpages');
var Img = require('../app/controllers/img');
var Admin = require('../app/controllers/admin');
var Cr = require('../app/controllers/cr');

var multer  = require('multer')
var upload = multer({ dest: __dirname + '/upload/' });
var _ = require('underscore');

module.exports = function(app) {
	app.use(function(req,res,next){
		var _user = req.session.user;
		app.locals.user = _user;
		next();
	})

	app.get('/',Index.index);

	app.get('/articles',Article.all);
	app.get('/article_in',Article.con);

	app.get('/diarys',Diary.all);
	app.get('/diary_in',Diary.con);

	app.get('/imgs',Img.all);

	app.get('/register',User.pagereg);
	app.get('/login',User.pagelogin);
	app.get('/logout',User.logout);
	app.post('/user/signup',User.signup);
	app.post('/user/signin',User.signin);
	// 留言板
	app.get('/connect',Message.see);
	app.post('/connect/message',User.signinRequired,Message.save);
	//关于我
	app.get('/about',Other.about);

	app.get('/admin',User.signinRequired,User.adminRequired,Admin.all);
	
	app.get('/admin/article',User.signinRequired,User.adminRequired,Article.pagearticle);
	app.post('/admin/article',User.signinRequired,User.adminRequired,Article.save);
	app.delete('/admin/article',User.signinRequired,User.adminRequired,Article.del);

	app.get('/admin/diary',User.signinRequired,Diary.pagediary);
	app.post('/admin/diary',User.signinRequired,Diary.save);
	app.delete('/admin/diary',User.signinRequired,Diary.del);

	app.get('/admin/img',User.signinRequired,User.adminRequired,Img.pageimg);
	app.post('/admin/img',User.signinRequired,User.adminRequired,Img.save);
	app.delete('/admin/img',User.signinRequired,User.adminRequired,Img.del);

	app.get('/admin/articles_list',User.signinRequired,User.adminRequired,Article.pagelist );
	app.get('/admin/diarys_list',User.signinRequired,User.adminRequired,Diary.pagelist );
	app.get('/admin/imgs_list',User.signinRequired,User.adminRequired,Img.pagelist );

	app.post('/user/comment',User.signinRequired,Comment.save);

	// 爬文章接口
	app.post('/Crawler',User.signinRequired,User.adminRequired,Cr.cr);


	
	app.get('/about',Other.min);

	app.get('*', Other.P404);

	app.get('*', function(req, res){
	   console.log("404");
	   res.send('查无此页面');
	});
}
