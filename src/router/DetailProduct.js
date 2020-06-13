let express = require("express");
let router = express.Router();
const {detialProduct} = require("../models/productsModel")
router.get("/*.:id", async (req, res) => {
    const {id} = req.params
    const resultData = await detialProduct(id)
    res.render("products/Detail",{resultData : resultData.dataValues})
})

module.exports = router;