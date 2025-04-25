const mongoose =require('mongoose');
const passport = require('passport');
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username:{type:String},
    fullname:{type:String},
    email:{type:String, trim:true },
    profileimg:{type:String},
    passport:{type:String},
    boards:{type:Array ,default:[]},
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:'Post'}]
});
userSchema.plugin(plm);
const user = mongoose.model("user",userSchema);

module.exports=user;