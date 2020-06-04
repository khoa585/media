const express = require("express");
const router = express.Router();
let multer = require("multer");
const {createNews} = require("./../../models/newsModel");
const { v4: uuidv4 } = require('uuid');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../public/upload');
    },
    filename: function (req, file, cb) {
        var nameFile = new Date().getTime() + '-' + file.originalname;
        cb(null, nameFile);
    }
});
let upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 20}
});
router.get("/add",(req,res)=>{
    res.render('admin/news/add',{user:req.user})
})
router.post("/add",upload.single("file"),
    async(req,res)=>{
    try {
        delete req.body.file ;
        req.body.id =uuidv4();
        if(req.file){
            req.body.image = "/upload/"+ req.file.filename;
        }
        let data = await createNews(req.body);
        return res.json({
            status:"success",
            data:data
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status:"error",
            data:error
        })
    }
})
router.get("(/:id)?",(req,res)=>{
    res.render('admin/news/news',{user:req.user})
})


module.exports = router;