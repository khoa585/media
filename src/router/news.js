let express = require('express');
let router = express.Router();
let { getDetialNews,getListNews } = require("./../models/newsModel");
router.get("/", async (req, res) => {
    res.render("news/index")
})
router.get("/*.:id", async (req, res) => {
    const {id} = req.params
    const [resultDetailNews,resultNews] = await Promise.all([getDetialNews(parseInt(id)),getListNews(1,5)])
    res.render("news/detail",{resultDetailNews : resultDetailNews,resultNews : resultNews})
})
module.exports = router;