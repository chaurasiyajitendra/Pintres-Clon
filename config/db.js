const mongoose = require('mongoose');
const db = mongoose.connect('mongodb+srv://chaurasiyajitendra2005:rBbzAMVfLBRjJqfO@pintrest1.pc6n1bh.mongodb.net/').then(()=>{
    console.log("Connected to data base")
})


module.exports =db;
 
