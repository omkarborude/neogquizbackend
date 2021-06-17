const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { extend } = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mySecret = process.env['jwt-secret']

router.route("/userdetails/:_id")
.get(async(req,res)=> {
  try{
    const _id = req.params;
    let user = await User.findOne({_id});
    if(user) {
      const userData = {email:user.email,username:user.username}
      res.status(200).json({data:userData})
    }
 
  }catch(error){
        res.status(500).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
})

router.route("/login")
.post(async(req,res)=> {
  const {email,password} = req.body;
  let user = await User.findOne({email});
  if(user) {
    if(bcrypt.compareSync(password,user.password)){
      const token = jwt.sign({_id:user._id,username:user.username},mySecret,{expiresIn:"24h"}) 
      res.status(200).json({success:true,token})
    } else {
      res.status(400).json({
        success: false,
        message: "Wrong Password !",
      });
    }
  }else {
    res.status(401).json({
      success: false,
      message: "User not found",
    });
  }
})

router.route("/signup")
.post(async(req,res)=>{
  try{
    let newUserData = req.body;
    const userAlreadyExist = await User.findOne({email:newUserData.email});

    if(userAlreadyExist) {
      res.status(400).json({success:false,message:"user already exist with same email !"})
    } 
    newUserData.password = bcrypt.hashSync(newUserData.password,10)
    let newUserDB = new User(newUserData);
    newUserDB = await newUserDB.save();

    const token = jwt.sign({_id:newUserDB._id,username:newUserDB.username},mySecret,{expiresIn:"24h"}) 
 
    res.status(200).json({success:true,token:token})
     
  }catch(error){
        res.status(500).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
})

module.exports = router;
