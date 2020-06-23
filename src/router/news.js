let express = require('express');
let router = express.Router();
let { getDetialNews, getListNews, TotalNumberNews, searchNews, TotalNumberNewsSearch } = require("./../models/newsModel");
// router.get("/", async (req, res) => {
//     res.render("news/index")
// })
var moment = require('moment');
router.get("/", async (req, res) => {
    const Keysearch = req.query.s
    const NUMBER_IN_PAGE = 12;
    const page = req.query.page ? JSON.parse(req.query.page) : 1
    let key = ''
    if (Keysearch) {
        const [resultData, resultRight] = await Promise.all([searchNews(Keysearch), getListNews(page, 6)])
        key = Keysearch
        if (resultData.length > 0) {
            let arr = []
            resultData.map(task => {
                arr.push(task.id)
            })
            const resultTotals = await TotalNumberNewsSearch(arr);
            if (resultTotals.count % NUMBER_IN_PAGE == 0) {
                pages = resultTotals.count / NUMBER_IN_PAGE;
            } else {
                pages = Math.floor(resultTotals.count / NUMBER_IN_PAGE) + 1;
            }
            res.render("news/ListNews", { resultListNews: resultData, current: page, pages: pages, key: key, resultRight: resultRight,moment : moment })
        } else {
            res.render("news/ListNews", { resultListNews: resultData, current: 0, pages: 0, key: key, resultRight: resultRight,moment : moment })
        }
    } else {
        const [resultListNews, resultTotals,resultRight] = await Promise.all([getListNews(page, NUMBER_IN_PAGE), TotalNumberNews(),getListNews(page, 6)])
        if (resultTotals) {
            if (resultTotals.count % NUMBER_IN_PAGE == 0) {
                pages = resultTotals.count / NUMBER_IN_PAGE;
            } else {
                pages = Math.floor(resultTotals.count / NUMBER_IN_PAGE) + 1;
            }
            res.render("news/ListNews", { resultListNews: resultListNews, current: page, pages: pages, key: key,resultRight: resultRight ,moment : moment})
        }
    }

})
router.get("/*.:id", async (req, res) => {

    const { id } = req.params
    const [resultDetailNews, resultNews] = await Promise.all([getDetialNews(parseInt(id)), getListNews(1, 6)])
    res.render("news/detail", { resultDetailNews: resultDetailNews, resultNews: resultNews })
})
module.exports = router;
