const express = require("express");
const router = express.Router();
router.get("(/:id)?",(req,res)=>{
    console.log(req.params.id);
    res.render('admin/news/news',{user:req.user})
})

module.exports = router;