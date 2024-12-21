const Url = require('../models/url');
const {getUser} = require('../util/auth')


const handleUrlGet = async (req,res)=>{
    const user = req.user;
    try{
        const urls = await Url.find({user:user._id});
        res.status(200).render('url', {urls, user:user, site:{title:'url : short link'}});
    } catch(error){
        res.status(500).send('internal errors');
    }
}

const handleUrlAnalytics = async (req,res)=>{
        const {id} = req.query;
        const user = req.user;
        try{
            if(id){
                const url = await Url.findOne({shortID:id});
                res.status(200).render('analytics', {url, user:user, site:{title:'analytics : short link'}});
            } else {
                res.status(404).send('urls not found: 404');
            }
        } catch(error){
            res.status(500).send('internal errors');
        }
}

const handleUrlAnalyticsID = async (req,res)=>{
    const id = req.params.id;
    const user = req.user;
    try{
        const [url] = await Url.find({shortID:id});
        if(url){
            res.status(200).render('analytics', {url, user:user, site:{title:'analytics : short link'}});
        } else {
            res.status(404).send('urls not found: 404');
        }
    } catch(error){
        res.status(500).send('internal errors');
    }
}


module.exports = {
    handleUrlGet,
    handleUrlAnalytics,
    handleUrlAnalyticsID
}