const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const urlRouter = require('./routes/url');
const homeRouter = require('./routes/home');

dotenv.config();

const app = express();
const port = process.env.PORT;
connectDB();
app.set('view engine', 'ejs');


app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.use('/url', urlRouter);
app.use('/', homeRouter);

app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`);
});
