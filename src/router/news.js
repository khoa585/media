let express = require('express');
let router = express.Router();
let {getDetialNews} = require("./../models/newsModel");
router.get("/",async(req,res)=>{
    res.render("news/index")
})
router.get("/*:id",async(req,res)=>{
    console.log(req.params.id);
    res.render("news/detail")
})
module.exports = router ;