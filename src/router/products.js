let express = require("express");
let router = express.Router();
const { getListProducts ,totalNumber } = require("../models/productsModel")
router.get("/", async (req, res) => {
    const [resultData,totalProduct] = await Promise.all([getListProducts(),totalNumber()]);
    console.log(totalProduct.count);
    res.render("products/index", { resultData: resultData ,pages:Math.floor(totalProduct.count/20)+1,current:1})
})
router.get("/:type", async (req, res) => {
    const { type } = req.params
    let category = req.category.filter((item) => {
        return item.slug == type;
    })
    if (category.length == 0) {
        return res.redirect("/");
    }
    const resultData = await getListProducts(1, 10, category[0].id)
    res.render("products/softWare", { resultData: resultData, titleProduct: category[0].name ,pages:1,current:1})
})

module.exports = router;