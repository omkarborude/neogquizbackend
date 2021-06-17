const mongoose = require('mongoose');

const initializeConnectionDb = async() =>{
    await mongoose.connect('mongodb+srv://omkar:omkar@8354@cluster0.cnl1l.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true})
    console.log("db connected"); 
}

module.exports = initializeConnectionDb;
