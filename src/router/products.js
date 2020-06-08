let express = require("express");
let router = express.Router();
const { getListProducts } = require("../models/productsModel")
router.get("/", async (req, res) => {
    const resultData = await getListProducts()
    res.render("products/index", { resultData: resultData })
})
router.get("/:facebook", async (req, res) => {
    // const {facebook} = req.params
    // const resultData = await getListProducts(facebook)
    // console.log(resultData)
    const resultData = await getListProducts()
    res.render("products/SoftwareFb",{ resultData: resultData })
})
router.get("/phan-mem-tiktok", async (req, res) => {
    const resultData = await getListProducts()
    res.render("products/SoftwareTikTok",{ resultData: resultData })
})
router.get("/phan-mem-zalo", async (req, res) => {
    const resultData = await getListProducts()
    res.render("products/SoftwareZalo",{ resultData: resultData })
})

module.exports = router;