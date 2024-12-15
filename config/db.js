const db = require('mongoose');

const connectDB = async ()=>{
    try{
        await db.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected`);
    } catch(err){
        console.log(`DB connection error : ${err}`)
    }
}

module.exports = connectDB;