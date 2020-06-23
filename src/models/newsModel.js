const { newsDB, newsFields } = require("./../databases/news");
const { Op } = require("sequelize");
const PAGE = 1;
const LIMIT_NUMBER = 12;
const createNews = async (data) => {
    return newsDB.create({ ...data });
}
const getListNews = async (page = PAGE, limit = LIMIT_NUMBER, sortBy) => {
    console.log(sortBy);
    if (sortBy) {
        return newsDB.findAll({
            limit: limit,
            offset: (page - 1) * limit,
            order: [[sortBy.name, sortBy.sort]],
            raw: true
        })
    }
    else {
        return newsDB.findAll({
            limit: limit,
            offset: (page - 1) * limit,
            raw: true
        })
    }

}
const TotalNumberNews = async () => {
    return newsDB.findAndCountAll({ raw: true });
}
const deleteNews = async (id) => {
    return newsDB.destroy({
        where: {
            [newsFields.id]: id
        }
    })
}
const deleteManyNews = async (data) => {
    return newsDB.destroy({
        where: {
            [newsFields.id]: {
                [Op.in]: [...data]
            }
        }
    })
}
const getDetialNews = async (id) => {
    return newsDB.findOne({
        where: { [newsFields.id]: id },
        raw: true
    })
}
const updateNews = async (id, data) => {
    return newsDB.update({ ...data }, {
        where: {
            id: id
        }
    })
}
const searchNews = async (data) => {
    return await newsDB.findAll({
        where: {
            [Op.or]: [
                {
                    [newsFields.title]: {
                        [Op.like]: `%${data}%`
                    },
                },
                {
                    [newsFields.html]: {
                        [Op.like]: `%${data}%`
                    }
                }
            ]
        }
    })
}
const TotalNumberNewsSearch = async (data) => {
    return await newsDB.findAndCountAll({
        where: {
            [newsFields.id]: {
                [Op.in]: [...data]
            }
        }
    })
}
module.exports = {
    createNews,
    getListNews,
    TotalNumberNews,
    deleteNews,
    getDetialNews,
    updateNews,
    deleteManyNews,
    searchNews,
    TotalNumberNewsSearch
}