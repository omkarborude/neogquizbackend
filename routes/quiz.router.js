const express = require("express");
const router = express.Router();
const {Quiz} = require("../models/quiz.model")

router.route("/getquiz")
.get(async(req,res)=> {
  const data = await Quiz.find();
  res.json({questionlist:data})
})
.post(async(req,res)=> {
  try{
     const quizDataa = req.body;
     const newDBData = new Quiz(quizDataa);
     const addedQuizFromDb = await newDBData.save();
        res.status(201).json({ questionlist : addedQuizFromDb, success : true })
  } catch(error){
        res.status(500).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
})

module.exports = router;