const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://0.0.0.0/Pintrest').then(()=>{
    console.log("Connected to data base")
})


module.exports =db;
 