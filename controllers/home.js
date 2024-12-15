const Url = require('../models/url');
const {nanoid} = require('nanoid');

const handleHomeGet = async (req, res)=>{
    const { shortUrl } = req.query;
    res.render('index', {url:shortUrl});
}

const handleHomePost = async (req,res)=>{
    const {url} = req.body;
    const host = req.headers.host;
    const protocol = req.protocol;
    const shortID = nanoid(6);
    try{
        const newurl = new Url({
            originalUrl:url,
            shortUrl:`${protocol}://${host}/${shortID}`,
            shortID: shortID
        });
        const data = await newurl.save();
        res.status(202).redirect(`/?shortUrl=${encodeURIComponent(data.shortUrl)}`);
    } catch(error){
        res.status(500).send('internal errors');
    }
}

const handleHomeById = async(req,res)=>{
    const id = req.params.id;
    const host = req.headers.host;
    const protocol = req.protocol;
    try{
        const [url] = await Url.find({shortUrl:`${protocol}://${host}/${id}`});
        if(url){
            url.visit +=1;
            await url.save();
            res.status(303).redirect(url.originalUrl);
        } else {
            res.status(404).send('urls not found: 404');
        }
    }catch(error){
        res.status(500).send('internal errors');
    }
}

module.exports = {
    handleHomeGet,
    handleHomePost,
    handleHomeById
}