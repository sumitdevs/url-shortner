const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const urlRouter = require('./routes/url');
const restrictToLoggedinUserOnly = require('./middleware/auth');
dotenv.config();
const staticRouter = require('./routes/static');

const app = express();
const port = process.env.PORT;
connectDB();
app.set('view engine', 'ejs');


app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(cookieParser());


app.use('/url', restrictToLoggedinUserOnly, urlRouter);
app.use('/', staticRouter);

app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`);
});
