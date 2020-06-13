let express = require("express");
let router = express.Router();
let multer = require("multer");
let {genId} = require("./../../common/TextHelper");
let productModel = require('./../../models/productsModel');
let moment = require("moment");
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
router.get("/add",async(req,res)=>{
    res.render("admin/product/add",{user:req.user})
})
router.post("/add",upload.single("file"),
    async(req,res)=>{
    try {
        delete req.body.file ;
        req.body.id =genId();
        if(req.file){
            req.body.image = "/upload/"+ req.file.filename;
        }
        let data = await productModel.createNews(req.body);
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
router.post("/delete",async(req,res)=>{
    try {
        // console.log(req.body);
        let resultDelete = await productModel.deleteProduct(req.body.id);
        return res.json({
            status:"success",
            data:resultDelete
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status:"error",
            data:error
        })
    }
})
router.post("/update",upload.single("file"),
    async(req,res)=>{
    // console.log(req.body);
    let {id} = req.body ;
    delete req.body.id ;
    delete req.body.file ;
    try {
        if(req.file){
            req.body.image = "/upload/"+ req.file.filename;
        }
        let dataUpdate = await productModel.updateProduct(id,req.body);
        return res.json({
            status:"success",
            data:dataUpdate
        })
    } catch (error) {
        console.log(error);
    }
})
router.get("/detial/:id",async(req,res)=>{
    try {
        let resultProduct = await productModel.detialProduct(req.params.id);
        if(!resultProduct){
            return res.redirect("/adminmanage");
        }
        return res.render("admin/product/detial",{user:req.user,productDetial:resultProduct,moment:moment})
    } catch (error) {
        return res.redirect("/adminmanage");
    }
})
router.get("(/:id)?",async(req,res)=>{
    let page=1 ;
    if(req.params.id){
        page =req.params.id ;
    }
    let [listProduct,totalPage] = await Promise.all([productModel.getListProducts(page),productModel.totalNumber()]);
    // console.log(listProduct);
    console.log(totalPage)
    res.render("admin/product/product",{user:req.user,moment:moment ,listProduct:listProduct,pages:Math.floor(totalPage.count/6)+1,current:page})
})
module.exports = router ;