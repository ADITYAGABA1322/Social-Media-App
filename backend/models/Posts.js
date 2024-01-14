const mongoose = require("mongoose");
const PostsSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  reaction: {
    type: Number,
    default:0
  },
  comment:[
   {type:String}
  ],
  date: {
    type: Date,
   default:Date.now
  },
});

module.exports=mongoose.model('posts',PostsSchema)
