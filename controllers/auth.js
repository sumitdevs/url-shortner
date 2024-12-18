const User = require('../models/user');
const {v4: uuidv4} = require('uuid');
const {setUser, getUser} = require('../util/auth');


const handleSignup = (req,res) =>{
    const uid = req.cookies.uid;
    if(!uid) return res.status(200).render('signup', {user:''});
    const user = getUser(uid);
    if(!user) return res.status(200).render('signup', {user:''});
     else return res.status(200).redirect('/');
}

const handleLogin = (req,res) =>{
    const uid = req.cookies.uid;
    if(!uid) return res.status(200).render('login', {user:''});
    const user = getUser(uid);
    if(!user) return res.status(200).render('login', {user:''});
     else return res.status(200).redirect('/');
}

const handleLoginPost = async (req,res) =>{
    const {email, password}  = req.body;
    try{
        const user = await User.findOne({email, password});
        if(!user){
            res.status(404).render('notfound.ejs', {msg:'invalid email or password'});
        }
        if(user){
            const sessionId = uuidv4();
            setUser(sessionId, user);
            res.cookie('uid', sessionId);
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
            res.status(409).render('notfound.ejs', {msg:'users already exists', user:user});
        } else {
            const user = new User({...data});
            const newUser = await user.save();
            if(newUser) res.status(202).redirect('/login');
        }
        
    } catch(error){
        res.status(500).render('notfound.ejs', {msg:'internal errors'});
        console.log(error);
    }
}

module.exports = {
    handleSignup,
    handleLogin,
    handleLoginPost,
    handleSignupPost
}