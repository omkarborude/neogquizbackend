const express = require("express");
const router = express.Router();
const Score = require("../models/score.model");
const { extend } = require("lodash");


router.route("/getallscore")
.get(async(req,res)=> {
  try{
     
     const scores = await Score.find({})
     res.json({scores})

  }catch(error){
        res.status(500).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
})

router.route("/userscore/:userId")
.get(async(req,res)=> {
  try{

    const {userId} = req.params;
    const scores = await Score.find({userId:userId})
    res.json({scores})

  }catch(error){
        res.status(500).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
})

router.route("/savescore/:userId")
.post(async(req,res)=> {
  try{

    const {userId} = req.params;
    const {quiz,score,username} = req.body;
    const saveDB =  Score({userId:userId,username:username ,quiz:quiz,score:score})
    await saveDB.save();
    res.json({saveDB})

  }catch(error){
        res.status(500).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
})


module.exports = router;