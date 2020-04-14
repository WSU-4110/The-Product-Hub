var mongoose= require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema= new mongoose.Schema({
	username: String,
	password: String
});


//Get all needed methods for the passportLocalMongoose package
//By using this, no need to redefine User.serialize and deserialize functions
UserSchema.plugin(passportLocalMongoose);

module.exports= mongoose.model("User", UserSchema);