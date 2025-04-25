const multer = require('multer');
const {v4: uuidv4}= require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/img/uploads')
    },
    filename:(req,file,cb)=>{
        const uniqname = uuidv4();
        cb(null , uniqname + path.extname(file.originalname));
    }
}) 

const upload = multer({storage:storage});

module.exports=upload;