var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CommentSchema = new mongoose.Schema({
	article:String,
	reply:[{
		to:{type: ObjectId,ref: 'User'},
		from:{type: ObjectId,ref: 'User'},
		content:String,
	}],
	from:{
		type: ObjectId,
		ref: 'User'
	},
	content:String,
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

CommentSchema.pre('save',function(next) {
	if(this.isNew){
		this.meta.creatAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	next()
})

CommentSchema.statics ={
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
module.exports = CommentSchema