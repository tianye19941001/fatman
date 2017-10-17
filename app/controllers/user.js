var User = require('../models/users');

exports.signup = function(req,res) {
	var _user = req.body.user;
	console.log(_user);
	User.findOne({name:_user.name},function(err,user){
		if (err) console.log(err);
		if (user){
			console.log(user);
			return res.redirect('/register');
		}else{
			var user = new User(_user);
			user.save(function(err,user){
				if (err) console.log(err);
				res.redirect('/login');
			});
		}
		
	});
}

exports.signin = function(req,res) {
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;
	User.findOne({name:name},function(err,user){
		if (err) console.log(err);
		if (!user) return res.redirect('/register');
		if (true) {
			user.comparePassword(password,function(err,isMatch){
					if (err) console.log(err);
					if(isMatch){
						req.session.user = user
						return res.redirect('/')
					}else{
						return res.redirect('/login')
						console.log('password is not matched')
				}
			})
		}
	})
}
exports.logout = function(req,res){
	delete req.session.user;
	return res.redirect('/');
}
exports.pagelogin = function(req,res){
	res.render('login',{
		title:'小楼兰的奔跑-登录页面'
	})
}
exports.pagereg = function(req,res){
	res.render('register',{
		title:'小楼兰的奔跑-注册页面'
	})
}
exports.signinRequired = function(req,res,next){
	var user = req.session.user
	if (!user) {
		return res.redirect('/login')
	}
	next()
}
exports.adminRequired = function(req,res,next){
	var user = req.session.user
	if (user.role<=10) {
		return res.redirect('/')
	}
	next()
}