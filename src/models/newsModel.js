const {newsDB,newsFields} = require("./../databases/news");
const { Op } = require("sequelize");
const PAGE =1  ;
const LIMIT_NUMBER= 6 ;
const createNews = async (data)=>{
    return newsDB.create({...data});
}
const getListNews = async (page=PAGE,limit=LIMIT_NUMBER,sortBy)=>{
    
    return newsDB.findAll({
       limit:limit,
       offset:(page-1)*limit,
       order:[[sortBy.name,sortBy.sort]],
       raw:true
    })
}
const TotalNumberNews = async()=>{
    return newsDB.findAndCountAll({raw:true});
}
const deleteNews = async (id)=>{
    return newsDB.destroy({
        where:{
            [newsFields.id]:id
        }
    })
}
const deleteManyNews = async (data)=>{
    return newsDB.destroy({
        where:{
            [newsFields.id]:{
                [Op.in]:[...data]
            }
        }
    })
}
const getDetialNews = async(id)=>{
    return newsDB.findOne({
        where:{[newsFields.id]:id},
        raw:true
    })
}
const updateNews = async(id,data)=>{
    return newsDB.update({...data},{
        where:{
            id:id
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
    deleteManyNews
}