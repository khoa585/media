let express = require("express");
let router = express.Router();
const { getListProducts } = require("../models/productsModel")
router.get("/", async (req, res) => {
    const resultData = await getListProducts()
    res.render("products/index", { resultData: resultData })
})
router.get("/:type", async (req, res) => {
    const {type} = req.params
    console.log( req.category)
    let category  = req.category.filter((item)=>{
        return item.slug == type ;
    })
    if(category.length ==0){
        return res.redirect("/");
    }
    const resultData = await getListProducts(1,10,category[0].id)
    res.render("products/softWare",{ resultData: resultData ,titleProduct : category[0].name})
})

module.exports = router;