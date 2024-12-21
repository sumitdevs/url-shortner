const express = require('express');

const {handleHomeGet, handleHomeById, handleHomePost, handleLogout} = require('../controllers/home');

const {handleLogin, handleSignup, handleSignupPost, handleLoginPost} = require('../controllers/auth');

const staticRouter = express.Router();
 
staticRouter.get('/', handleHomeGet);
staticRouter.post('/', handleHomePost);
staticRouter.get('/login', handleLogin);
staticRouter.post('/login', handleLoginPost);
staticRouter.get('/logout', handleLogout);
staticRouter.get('/signup', handleSignup);
staticRouter.post('/signup', handleSignupPost);
staticRouter.get('/:id', handleHomeById);

module.exports = staticRouter;