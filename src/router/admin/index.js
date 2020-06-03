const express = require("express");
let newsRouter = require('./news');
const router = express.Router();
router.use("/news",newsRouter);
router.get("/",(req,res)=>{
    res.render("admin/index");
})

module.exports = router;