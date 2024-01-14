const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  avatar:{
   type:String
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default:Date.now()
  },
});
const User=mongoose.model('user',UserSchema)
//To make email unique by creating unique indexes automatically in mongo
// User.createIndexes();
module.exports=User
