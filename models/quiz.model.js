const mongoose = require('mongoose');
const { Schema } = mongoose;

const OptionSchema = new Schema({
      id:Schema.Types.ObjectId,
      text:String,
      isRight:Boolean,
})


const QuestionSchema = new Schema({
    question:String,
    points:Number,
    options:[OptionSchema],
})

const QuizSchema = new Schema({
    id:Schema.Types.ObjectId,
    topic:String,
    description:String,
    image:String,
    questions:[QuestionSchema]
});

const Quiz = mongoose.model("Quiz", QuizSchema);


module.exports = { Quiz };
