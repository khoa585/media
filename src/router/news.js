let express = require('express');
let router = express.Router();
let { getDetialNews, getListNews, TotalNumberNews } = require("./../models/newsModel");
// router.get("/", async (req, res) => {
//     res.render("news/index")
// })
router.get("/", async (req, res) => {
    const NUMBER_IN_PAGE = 12;
    const page = req.query.page ? JSON.parse(req.query.page) : 1
    const [resultListNews, resultTotals] = await Promise.all([getListNews(page, NUMBER_IN_PAGE), TotalNumberNews()])
    if (resultTotals) {
        if (resultTotals.count % NUMBER_IN_PAGE == 0) {
            pages = resultTotals.count / NUMBER_IN_PAGE;
        } else {
            pages = Math.floor(resultTotals.count / NUMBER_IN_PAGE) + 1;
        }
    }
    res.render("news/ListNews", { resultListNews: resultListNews, current: page, pages: pages })
})
router.get("/*.:id", async (req, res) => {
    const { id } = req.params

    const [resultDetailNews, resultNews] = await Promise.all([getDetialNews(parseInt(id)), getListNews(1, 6)])
    console.log(resultDetailNews)
    res.render("news/detail", { resultDetailNews: resultDetailNews, resultNews: resultNews })
})
module.exports = router;
