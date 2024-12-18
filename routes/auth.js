const express = require('express');
const {handleLogin, handleSignup, handleSignupPost, handleLoginPost} = require('../controllers/auth');
const authRouter = express.Router();

authRouter.get('/login', handleLogin);
authRouter.post('/login', handleLoginPost);

authRouter.get('/signup', handleSignup);
authRouter.post('/signup', handleSignupPost);

module.exports = authRouter;