let express = require('express');
let router = express.Router();
let {getDetialNews} = require("./../models/newsModel");
router.get("/",async(req,res)=>{
    res.render("news/index")
})
router.get("/*:id",async(req,res)=>{
    const id = req.params.id
    const result = await getDetialNews(id)
    console.log(result)
    res.render("news/detail")
})
module.exports = router ;