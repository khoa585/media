let express = require("express");
let router = express.Router();
const { getListProducts ,totalNumber } = require("../models/productsModel");
const { get } = require("./admin");
const NUMBER_IN_PAGE = 12 ;
router.get("/", async (req, res) => {
    let page = req.query.page || 1 ;
    let pages =0 ;
    const [resultData,totalProduct] = await Promise.all([getListProducts(page,NUMBER_IN_PAGE,req.query.price),totalNumber()]);
    if(totalProduct.count%NUMBER_IN_PAGE==0){
        pages = totalProduct.count/NUMBER_IN_PAGE ;
    }else {
        pages = Math.floor(totalProduct.count/NUMBER_IN_PAGE)+1 ;
    }
    console.log(totalProduct.count);
    res.render("products/index", { resultData: resultData ,pages:pages,current:page})
})
router.get("/:type", async (req, res) => {
    const { type } = req.params;
    let page = req.query.page || 1 ;
    let pages =0 ;
    let category = req.category.filter((item) => {
        return item.slug == type;
    })
    if (category.length == 0) {
        return res.redirect("/");
    }
    const resultData = await getListProducts(page,NUMBER_IN_PAGE,req.query.price, category[0].id);
    let totalProduct = await totalNumber(category[0].id);
    if(totalProduct.count%NUMBER_IN_PAGE==0){
        pages = totalProduct.count/NUMBER_IN_PAGE ;
    }else {
        pages = Math.floor(totalProduct.count/NUMBER_IN_PAGE)+1 ;
    }
    //const [resultData,totalProduct] = await Promise.all([getListProducts(page),totalNumber()]);
    res.render("products/softWare", { resultData: resultData, titleProduct: category[0].name ,pages:pages,current:page})
})
module.exports = router;