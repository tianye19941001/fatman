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

	app.get('/admin/diary',User.signinRequired,User.adminRequired,Diary.pagediary);
	app.post('/admin/diary',User.signinRequired,User.adminRequired,Diary.save);
	app.delete('/admin/diary',User.signinRequired,User.adminRequired,Diary.del);

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

















	// demo
	app.post('/reg', function (req, res) {
	   response = {
	       user:req.body.user,
	       password:req.body.password
	   };
	   console.log(req);
	   res.end(JSON.stringify(response));
	});

	//  主页输出 "Hello World"
	app.get('/', function (req, res) {
	   console.log("主页 GET 请求");
	   res.send('Hello GET');
	})
	//  POST 请求
	app.post('/', function (req, res) {
	   console.log("主页 POST 请求");
	   res.send('Hello POST');
	})

	//  /del_user 页面响应
	app.get('/del_user', function (req, res) {
	   console.log("/del_user 响应 DELETE 请求");
	   res.send('删除页面');
	})

	//  /list_user 页面 GET 请求
	app.get('/list_user', function (req, res) {
	   console.log("/list_user GET 请求");
	   res.send('用户列表页面');
	})

	// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
	app.get('/ab*cd', function(req, res) {
	   console.log("/ab*cd GET 请求");
	   res.send('正则匹配');
	})
	app.get('/cookies', function(req, res) {
	  console.log("Cookies: ", req.cookies)
	})
	// demo app.get('/index',function(req,res){
	// 	res.sendFile( __dirname + "/" + "demo.html" );
	// })


	app.get('/up',function(req,res){
		res.sendFile( __dirname + "/" + "demo2.html" );
	})

	app.get('/process_post', function (req, res) {
	   // 输出 JSON 格式
	   response = {
	       first_name:req.query.user,
	       last_name:req.query.password
	   };
	   console.log(req);
	   res.end(JSON.stringify(response));
	})

	app.post('/file_upload', function (req, res) {
	   console.log(req.files[0]);  // 上传的文件信息
	   var des_file = __dirname + "/" + req.files[0].originalname;
	   fs.readFile( req.files[0].path, function (err, data) {
	        fs.writeFile(des_file, data, function (err) {
	         if( err ){
	              console.log( err );
	         }else{
	               response = {
	                   message:'File uploaded successfully',
	                   filename:req.files[0].originalname
	              };
	          }
	          console.log( response );
	          res.end( JSON.stringify( response ) );
	       });
	   });
	})

	app.get('*', function(req, res){
	   console.log("404");
	   res.send('查无此页面');
	});
}
