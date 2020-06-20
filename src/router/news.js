let express = require('express');
let router = express.Router();
let { getDetialNews, getListNews, TotalNumberNews } = require("./../models/newsModel");
router.get("/", async (req, res) => {
    res.render("news/index")
})
router.get("/tin-tuc", async (req, res) => {
    const page = req.query.page ? req.query.page : 1
    const [resultListNews, resultTotals] = await Promise.all([getListNews(page, 15), TotalNumberNews()])
    console.log(resultListNews)
    if (resultTotals) {
        pages = resultTotals.count / 12
    }
    res.render("news/ListNews", { resultListNews: resultListNews, current: page, pages: pages })
})
router.get("/*.:id", async (req, res) => {
    const { id } = req.params

    const [resultDetailNews, resultNews] = await Promise.all([getDetialNews(parseInt(id)), getListNews(1, 5)])
    console.log(resultDetailNews)
    res.render("news/detail", { resultDetailNews: resultDetailNews, resultNews: resultNews })
})
module.exports = router;
