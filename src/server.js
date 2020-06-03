require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const router = require('../src/router/index');
const cors = require("cors");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('views',path.join(__dirname,'/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use("/",router);

app.listen(process.env.PORT || 3000 ,()=>{
    console.log('running...')
})