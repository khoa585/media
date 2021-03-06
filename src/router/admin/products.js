let express = require("express");
let router = express.Router();
let multer = require("multer");
let { genId } = require("./../../common/TextHelper");
let productModel = require('./../../models/productsModel');
let moment = require("moment");
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../public/upload');
    },
    filename: function (req, file, cb) {
        var nameFile = new Date().getTime() + '-' + file.originalname;
        cb(null, nameFile);
    }
});
let upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 20 }
});
router.get("/add", async (req, res) => {
    res.render("admin/product/add", { user: req.user })
})
router.post("/add", upload.single("file"),
    async (req, res) => {
        try {
            delete req.body.file;
            req.body.id = genId();
            if (req.file) {
                req.body.image = "/upload/" + req.file.filename;
            }
            await productModel.createNews(req.body);
            return res.json({
                status: "success",
                data: {}
            })
        } catch (error) {
            console.log(error);
            return res.json({
                status: "error",
                data: error
            })
        }

    })
router.post("/delete", async (req, res) => {
    try {
        // console.log(req.body);
        await productModel.deleteProduct(req.body.id);
        return res.json({
            status: "success",
            data: {}
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: "error",
            data: error
        })
    }
})

router.post("/deleteMany", async (req, res) => {
    const id = req.body["id[]"]
    try {
        await productModel.deleteManyProduct(id);
        return res.json({
            status: "success",
            data: {}
        })
    } catch (error) {
        return res.json({
            status: "error",
            data: error
        })
    }
})

router.post("/update", upload.single("file"),
    async (req, res) => {
        // console.log(req.body);
        let { id } = req.body;
        delete req.body.id;
        delete req.body.file;
        try {
            if (req.file) {
                req.body.image = "/upload/" + req.file.filename;
            }
            await productModel.updateProduct(id, req.body);
            return res.json({
                status: "success",
                data: {}
            })
        } catch (error) {
            console.log(error);
        }
    })
router.get("/detial/:id", async (req, res) => {
    try {
        let resultProduct = await productModel.detialProduct(req.params.id);
        if (!resultProduct) {
            return res.redirect("/adminmanage");
        }
        return res.render("admin/product/detial", { user: req.user, productDetial: resultProduct, moment: moment })
    } catch (error) {
        return res.redirect("/adminmanage");
    }
})
const NUMBER_IN_PAGE = 100;
router.get("(/:id)?", async (req, res) => {
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
    let page = req.query.page || 1;
    let [listProduct, totalPage] = await Promise.all([productModel.getListProducts(page, NUMBER_IN_PAGE, sort_By, req.query.Category), productModel.totalNumber(req.query.Category)]);

    res.render("admin/product/product", {
        user: req.user,
        moment: moment,
        paths: paths,
        listProduct: listProduct,
        pages: Math.floor(totalPage.count / NUMBER_IN_PAGE) + 1,
        current: page,
        countPrice: countPrice,
        Category: req.query.Category
    })
})
module.exports = router;