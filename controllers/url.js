const Url = require('../models/url');


const handleUrlGet = async (req,res)=>{
    try{
        const urls = await Url.find();
        res.status(200).render('url', {urls});
    } catch(error){
        res.status(500).send('internal errors');
    }
}

const handleUrlAnalytics = async (req,res)=>{
        const {id} = req.query;
        try{
            if(id){
                const [url] = await Url.find({shortID:id});
                res.status(200).render('analytics', {url})
            } else {
                res.status(404).send('urls not found: 404');
            }
        } catch(error){
            res.status(500).send('internal errors');
        }
}

const handleUrlAnalyticsID = async (req,res)=>{
    const id = req.params.id;
    try{
        const [url] = await Url.find({shortID:id});
        if(url){
            res.status(200).render('analytics', {url})
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