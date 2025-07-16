const User = require('../models/user');
const {v4: uuidv4} = require('uuid');
const {setUser, getUser} = require('../util/auth');


const handleSignup = (req,res) =>{
    const uid = req.cookies.uid;
    if(!uid) return res.status(200).render('signup', {user:'', site:{title:'signup : short link'}});
    const user = getUser(uid);
    if(!user) return res.status(200).render('signup', {user:'', site:{title:'signup : short link'}});
     else return res.status(200).redirect('/');
}

const handleLogin = (req,res) =>{
    const uid = req.cookies.uid;
    if(!uid) return res.status(200).render('login', {user:'', site:{title:'login : short link'}});
    const user = getUser(uid);
    if(!user) return res.status(200).render('login', {user:'', site:{title:'login : short link'}});
     else return res.status(200).redirect('/');
}

const handleLoginPost = async (req,res) =>{
    const {email, password}  = req.body;
    try{
        const user = await User.findOne({email, password});
        if(!user){
            res.status(404).render('notfound.ejs', {msg:'invalid email or password', user:'', site:{title:'404 : short link'}});
        }
        if(user){
            const token = setUser(user);
            res.cookie('uid', token,{
                maxAge:60*60*1000,
                httpOnly:true,
                secure:true
            });
            res.status(200).redirect('/');
        } 
       
    } catch(error){
        console.log(error);
    }
}

const handleSignupPost = async (req,res)=>{
    const data = req.body;
    try{
        const user = await User.findOne({email:data.email});
        if(user){
            res.status(409).render('notfound.ejs', {msg:'users already exists', user:user, site:{title:'404 : short link'}});
        } else {
            const user = new User({...data});
            const newUser = await user.save();
            if(newUser) res.status(202).redirect('/login');
        }
        
    } catch(error){
        res.status(500).render('notfound.ejs', {msg:'internal errors', user:'', site:{title:'500 : short link'}});
    }
}

module.exports = {
    handleSignup,
    handleLogin,
    handleLoginPost,
    handleSignupPost
}