const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.JWT_SECRET;

const setUser = (user)=>{
    return jwt.sign({
        _id:user._id,
        email:user.email,
        name:user.name
    }, 
    secret,
    { expiresIn: "1h" }
)
}

const getUser = (token)=>{
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}