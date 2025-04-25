const express =require('express');
const app =express();
const db = require('./config/db');
const indexRouter = require('./routes/index.router');
const expressSession = require('express-session');
const passport = require('passport');
const userModule = require('./modules/user.modules');
const multer = require("./config/multer");

app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:"Jay maa Bhavani"
}));
 
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(userModule.serializeUser());
passport.deserializeUser(userModule.deserializeUser());

app.use('/',indexRouter);

app.listen(3000,()=>{
    console.log("Connect on the port 3000")
});   
