var express = require('express');
var fs = require("fs");
var path = require('path');
var multer  = require('multer');
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var dbUrl = 'mongodb://localhost/tianye2'
// var dbUrl = 'mongodb://tianye:19941001@localhost/tianye2';
mongoose.connect(dbUrl)

app.set('views','./app/views/pages')
app.set('view engine', 'jade')
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser({uploadDir:'./tmp'}));
// app.use(multer({ dest: '/tmp/'}).array('image'));

app.use(session({
	secret: 'tianye2',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	})
}));


require('./config/routes')(app);

var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("start", host, port);
})
