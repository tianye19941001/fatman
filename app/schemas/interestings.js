var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InterestingsSchema = new mongoose.Schema({
	title:String,
	detial:String,
	where:String,
	url :String,
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


InterestingsSchema.pre('save',function(next) {
	if(this.isNew){
		this.meta.creatAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}
	next()
})

InterestingsSchema.statics ={
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
module.exports = InterestingsSchema
