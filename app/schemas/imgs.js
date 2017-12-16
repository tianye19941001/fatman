var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImgsSchema = new mongoose.Schema({
	title:String,
	detial:String,
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


ImgsSchema.pre('save',function(next) {
	if(this.isNew){
		this.meta.creatAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}
	next()
})

ImgsSchema.statics ={
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
module.exports = ImgsSchema
