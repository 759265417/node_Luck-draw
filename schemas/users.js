var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	username:String,
	pw:String
});
module.exports=userSchema;