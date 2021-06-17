const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username:{
    type:String,
    required:"username require for user !"
  },
  email:{
    type:String,
    required:"email require for user"
  },
  password:{
    type:String,
    required:"password require for user"
  }
},{
  timestamps:true
})

const User = mongoose.model("User",UserSchema)

module.exports = User;