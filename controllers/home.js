const Url = require('../models/url');
const {nanoid} = require('nanoid');
const {getUser} = require('../util/auth')

const handleHomeGet = async (req, res)=>{
    const uid = req.cookies.uid;
    const { shortUrl } = req.query;
    if(!uid) return res.render('index', {user:'',site:{title:'short link'}});
    const user = getUser(uid);
    if(user) return res.render('index', {user:user, url:shortUrl,site:{title:'short link'}});
    else return  res.render('index', {user:'',site:{title:'short link'}});
}

const handleHomePost = async (req,res)=>{
    const uid = req.cookies.uid;
    const user = getUser(uid);
    const {url} = req.body;
    const host = req.headers.host;
    const protocol = req.protocol;
    const shortID = nanoid(6);
    try{
        const newurl = new Url({
            originalUrl:url,
            shortUrl:`${protocol}://${host}/${shortID}`,
            shortID: shortID,
            user: user._id
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

const handleLogout = (req,res)=>{
    res.clearCookie('uid');
    return res.status(200).redirect('/');
}

module.exports = {
    handleHomeGet,
    handleHomePost,
    handleHomeById,
    handleLogout
}