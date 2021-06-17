const mongoose = require("mongoose")
const { Schema } = mongoose;

const ScoreSchema = new Schema({
  userId:{
    type:Schema.Types.ObjectId,
    required:"yess"
  },
  username:String,
  quiz:String,
  score:Number
},{
  timestamps:true
})

const Score = mongoose.model("Score", ScoreSchema);

module.exports =  Score ;