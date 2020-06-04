let express = require('express');
let router = express.Router();
let {} = require("./../models/newsModel");
router.get("/",async(req,res)=>{
    res.render("news/index")
})
module.exports = router ;