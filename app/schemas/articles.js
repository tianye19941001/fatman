var mongoose = require('mongoose')
var Schema = mongoose.Schema 

var ArticleSchema = new mongoose.Schema({
	title:{
		unique:true,
		type:String
	},
	summary:String,
	url:String,
	meta:{
		creatAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

ArticleSchema.pre('save',function(next) {
	if(this.isNew){
		this.meta.creatAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}
	next()
})

ArticleSchema.statics ={
	fetch: function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},findById: function(id,cb){
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}
module.exports = ArticleSchema