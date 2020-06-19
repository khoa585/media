let express = require("express");
let router = express.Router();
const { getListProducts, totalNumber } = require("../models/productsModel");
const { get } = require("./admin");
const NUMBER_IN_PAGE = 100;
router.get("/", async (req, res) => {
    let page = req.query.page || 1;
    let pages = 0;
    let sort_By;
    let order = req.query.order
    let name = req.query.sortBy
    let paths = '';
    if (order && name) {
        if (order === 'desc' && name === "price") {
            sort_By = 1
        }
        if (order === 'asc' && name === "price") {
            sort_By = 2
        }
        if (order === 'desc' && name === "name") {
            sort_By = 3
        }
        if (order === 'asc' && name === "name") {
            sort_By = 4
        }
        if (order === 'desc' && name === "createdAt") {
            sort_By = 5
        }
        if (order === 'asc' && name === "createdAt") {
            sort_By = 6
        }
        paths = {
            order,
            name
        }
    }
    let countPrice = req.query.order ? sort_By : 0;
    const [resultData, totalProduct] = await Promise.all([getListProducts(page, NUMBER_IN_PAGE, sort_By), totalNumber()]);
    if (totalProduct.count % NUMBER_IN_PAGE == 0) {
        pages = totalProduct.count / NUMBER_IN_PAGE;
    } else {
        pages = Math.floor(totalProduct.count / NUMBER_IN_PAGE) + 1;
    }
    res.render("products/index", { resultData: resultData, pages: pages, current: page, countPrice: countPrice, paths: paths })
})
router.get("/:type", async (req, res) => {
    const { type } = req.params;
    let page = req.query.page || 1;
    let pages = 0;
    let sort_By;
    let order = req.query.order
    let name = req.query.sortBy
    let paths = '';
    if (order) {
        if (order === 'desc' && name === "price") {
            sort_By = 1
        }
        if (order === 'asc' && name === "price") {
            sort_By = 2
        }
        if (order === 'desc' && name === "name") {
            sort_By = 3
        }
        if (order === 'asc' && name === "name") {
            sort_By = 4
        }
        if (order === 'desc' && name === "createdAt") {
            sort_By = 5
        }
        if (order === 'asc' && name === "createdAt") {
            sort_By = 6
        }
        paths = {
            order,
            name
        }
    }
    let countPrice = req.query.order ? sort_By : 0;
    let category = req.category.filter((item) => {
        return item.slug == type;
    })
 
    if (category.length == 0) {
        return res.redirect("/");
    }
    const resultData = await getListProducts(page, NUMBER_IN_PAGE, sort_By, category[0].id);
    let totalProduct = await totalNumber(category[0].id);
    if (totalProduct.count % NUMBER_IN_PAGE == 0) {
        pages = totalProduct.count / NUMBER_IN_PAGE;
    } else {
        pages = Math.floor(totalProduct.count / NUMBER_IN_PAGE) + 1;
    }
    //const [resultData,totalProduct] = await Promise.all([getListProducts(page),totalNumber()]);
    res.render("products/softWare", { resultData: resultData, titleProduct: category[0].name, pages: pages, current: page, countPrice: countPrice ,paths: paths})
})
module.exports = router;