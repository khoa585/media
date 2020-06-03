const express = require("express");
const router = express.Router();
router.get("/",(req,res)=>{
    res.render('admin/news/news',{user:req.user})
})

module.exports = router;