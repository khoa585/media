const express = require("express");
let multer = require("multer");
const path = require("path");
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../public/upload');
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
let router = express.Router();
router.post("/",
    upload.single("file"),
    async (req,res)=>{
        if(req.file){
            res.json({status:"success",
            url:"/upload/"+req.file.filename})
        }
    }
)

module.exports = router ;