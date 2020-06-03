const express = require("express");
let newsRouter = require('./news');
const router = express.Router();
router.use("/news",newsRouter);
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/admin");
})
router.get("/",(req,res)=>{
    res.render("admin/index" ,{user:req.user});
})

module.exports = router;