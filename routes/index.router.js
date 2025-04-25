const express = require('express');
const router = express.Router();
const userModule = require('../modules/user.modules');
const PostModule = require('../modules/post.modules');
const passport = require('passport');
const localStargey = require('passport-local').Strategy;
const multer = require('../config/multer');
const res = require('express/lib/response');

passport.use(new localStargey(userModule.authenticate()));  

router.get('/',(req,res)=>{
    res.render('index')
});

router.get('/register',(re,res)=>{
    res.render('register')
});

router.post('/register',async(req,res)=>{
    const user = await userModule({
        username:req.body.username,
        fullname:req.body.fullname,
        email:req.body.email,
        passport:req.body.passport
    })
   await userModule.register(user,req.body.password)
    .then(function(){
        passport.authenticate('local')(req,res,function(){
            res.redirect('/profile');
        })
    }) 
});

router.post('/login',passport.authenticate('local',{
  failureRedirect:'/',
  successRedirect:'/profile',      
}),(req,res)=>{

});

router.get('/logout',(req,res,next)=>{
    req.logOut((err)=>{
        if(err){return next(err);}
        res.redirect('/');
    });
});

router.get('/feed',isloggin,async(req,res)=>{
    const user = await userModule.findOne({username:req.session.passport.user});
    const posts = await PostModule.find().populate('user')
    res.render('feed',{user,posts});
});
 
router.get('/profile',isloggin,async(req,res)=>{
    const user = await userModule.findOne({username:req.session.passport.user}).populate('posts');
    res.render('profile',{user});
});

router.get('/add',isloggin,async(req,res)=>{
    const user = await userModule.findOne({username:req.session.passport.user});
    res.render('add',{user});
});

router.get('/edit',isloggin,async(req,res)=>{
    const user = await userModule.findOne({username:req.session.passport.user});
    res.render('edit',{user});
});

router.get('/show/:postId',isloggin,async(req,res)=>{
    const user = await userModule.findOne({username:req.session.passport.user}).populate('posts');
    const postId = req.params.postId;
    const post =await PostModule.findById(postId).populate('user');
    res.render('show',{user,post});
})

router.get('/user/:userId',isloggin,async(req,res)=>{
    const userId = req.params.userId;
    const user = await userModule.findById(userId).populate('posts');
    res.render('user',{user})
})

router.get('/Deletepost/:postId', isloggin, async (req, res) => {
    try {
        const user = await userModule.findOne({ username: req.session.passport.user }).populate('posts');
        const postId = req.params.postId;
        const selectedPost = user.posts.find(post => post._id.toString() === postId);

        if (selectedPost) {
            // Remove the post from the user's posts array
            user.posts = user.posts.filter(post => post._id.toString() !== postId);
            await user.save();

            // Delete the post from the database
            await PostModule.findByIdAndDelete(postId);

            console.log(`Post with ID ${postId} deleted.`);
        } else {
            console.log(`Post with ID ${postId} not found.`);
        }

        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/edit',isloggin,async(req,res)=>{
    const user = await userModule.findOne({username:req.session.passport.user});
    const updateuser = await user.updateOne({
        fullname:req.body.ufullname,
        email:req.body.uemail
    });
    res.redirect('profile');
});

router.post('/createpost',isloggin, multer.single("postimg"),async(req,res)=>{
    const user = await userModule.findOne({username:req.session.passport.user});
    const post =  await PostModule.create({
        user:user._id,
        title:req.body.title,
        desc:req.body.description,
        img:req.file.filename
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
});

router.post('/fileupload',isloggin, multer.single("img"),async(req,res)=>{
    const user = await userModule.findOne({username:req.session.passport.user});
    user.profileimg = req.file.filename;
    await user.save();
    res.redirect('profile')
});

function isloggin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
};



module.exports=router;