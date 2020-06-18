const express = require("express");
const router = express.Router();
let multer = require("multer");
const { createNews, getListNews,deleteManyNews, TotalNumberNews, deleteNews, getDetialNews, updateNews } = require("./../../models/newsModel");
let { genId } = require("./../../common/TextHelper");
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
router.get("/add", (req, res) => {
    res.render('admin/news/add', { user: req.user })
})
router.post("/add", upload.single("file"),
    async (req, res) => {
        try {
            console.log(req.body)
            delete req.body.file;
            req.body.id = genId();
            if (req.file) {
                req.body.image = "/upload/" + req.file.filename;
            }
            let data = await createNews(req.body);
            return res.json({
                status: "success",
                data: data
            })
        } catch (error) {
            console.log(error);
            return res.json({
                status: "error",
                data: error
            })
        }
    })
router.post("/update", upload.single("file"),
    async (req, res) => {
        console.log(req.body);
        let { id } = req.body;
        delete req.body.id;
        delete req.body.file;
        try {
            if (req.file) {
                req.body.image = "/upload/" + req.file.filename;
            }
            let dataUpdate = await updateNews(id, req.body);
            return res.json({
                status: "success",
                data: dataUpdate
            })
        } catch (error) {
            console.log(error);
        }
    })
router.post("/delete", async (req, res) => {
    console.log(req.body);
    try {
        let resultDelete = await deleteNews(req.body.id);
        return res.json({
            status: "success",
            data: resultDelete
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: "error",
            data: error
        })
    }
})
router.get("(/:id)?", async (req, res) => {
    let page = 1;
    let LIMIT_NUMBER = 100;
    if (req.query.page) {
        page = req.query.page;
    }
    let paths = '';
    let sortBy = '';
    let order = req.query.order
    let name = req.query.sortBy
    if (order && name) {
        paths = {
            order,
            name
        }
        sortBy = {
            name: name,
            sort: order
        }
    } else {
        sortBy = {
            name: 'createdAt',
            sort: 'DESC'
        }
    }
    let [listNews, totalPage] = await Promise.all([getListNews(page, LIMIT_NUMBER, sortBy), TotalNumberNews()]);
    if (!listNews) {
        return res.redirect("/adminmanage");
    }
    res.render('admin/news/news', { user: req.user, listNews: listNews, pages: Math.floor(totalPage.count / 100) + 1, moment: moment, current: page, paths: paths })
})
router.get("/detial/:id", async (req, res) => {
    try {
        let resultNews = await getDetialNews(req.params.id);
        if (!resultNews) {
            return res.redirect("/adminmanage");
        }
        res.render("admin/news/detial", { user: req.user, newsDetial: resultNews, moment: moment })

    } catch (error) {
        console.log(error);
    }
})


router.post("/deleteMany", async (req, res) => {
    const id = req.body["id[]"]
    try {
        let resultDelete = await deleteManyNews(id);
        return res.json({
            status: "success",
            data: resultDelete
        })
    } catch (error) {
        return res.json({
            status: "error",
            data: error
        })
    }
})

module.exports = router;