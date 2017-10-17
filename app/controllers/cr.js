var http = require('http');
var cheerio = require('cheerio');
var mkdirp = require('mkdirp');
var fs = require('fs');

exports.cr = function (request,response) {
	var url = request.body.url;
	http.get(url,function(res){
		var html = '';
		res.on('data',function(data){
			html += data;
		})
		res.on('end',function(){
			response.send(findIwant(html));
		}).on('error',function(){
			console.log("出错");
		})
	})
}
function findIwant(html){
	var $ = cheerio.load(html);

	// // 尝试获取图片
	// $("p img").each(function(){
	// 	var src = $(this).attr("scr");
	// 	console.log("正在下载");
	// 	download(src, dir, Math.floor(Math.random()*100000) + src.substr(-4,4));
	// })

	var title = $('.postTitle2').text();
	var all = $('.postBody').text();
	var summary = all.substring(0,300)+'......';
	var data = {title:title,summary:summary};
	return data;
}