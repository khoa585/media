require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const path = require('path');
const router = require('../src/router/index');
const cors = require("cors");
const getListCategory = require('./common/getlistCategory');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret : "media",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60*60*1000 }
}))
app.set('views',path.join(__dirname,'/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(getListCategory);
app.use((req,res,next)=>{
    res.locals.path = req.path;
    res.locals.url = req.url ;
    next();
})
app.use("/",router);

app.listen(process.env.PORT || 3000 ,()=>{
    console.log('App Runing On : http://localhost:'+ process.env.PORT || 3000)
})