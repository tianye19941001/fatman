exports.about = function(req,res) {
	res.render("about",{
		title:"简介"
	})
}
exports.P404 = function(req,res){
	res.render("404",{
		title:"404"
	})
}
exports.min = function(req,res) {
	res.render("min",{
		title:""
	})
}
exports.pics = function(req,res) {
	res.render("pics",{
		title:"图片赏析"
	})
}