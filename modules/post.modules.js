const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:String,
    desc:String,
    img:String
});

const post = mongoose.model('Post',postSchema);
module.exports=post;