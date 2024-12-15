const express = require('express');
const {handleHomeGet, handleHomeById, handleHomePost} = require('../controllers/home');
const homeRouter = express.Router();

homeRouter.get('/', handleHomeGet);
homeRouter.post('/', handleHomePost);
homeRouter.get('/:id', handleHomeById);

module.exports = homeRouter;