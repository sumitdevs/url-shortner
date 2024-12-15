const express = require('express');
const {handleUrlGet, handleUrlAnalytics, handleUrlAnalyticsID} = require('../controllers/url');

const urlRouter = express.Router();

urlRouter.get('/', handleUrlGet);
urlRouter.get('/analytics/', handleUrlAnalytics);
urlRouter.get('/analytics/:id', handleUrlAnalyticsID);

module.exports = urlRouter;
