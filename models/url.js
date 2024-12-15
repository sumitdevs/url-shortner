const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortID:{
        type:String,
        required:true,
        unique:true
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    visit:{
        type:Number,
        default:0
    }
});

const Url = mongoose.model('url', urlSchema);
module.exports = Url;