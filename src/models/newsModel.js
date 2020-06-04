const {newsDB,newsFields} = require("./../databases/news");
const PAGE =1  ;
const LIMIT_NUMBER= 6 ;
const createNews = async (data)=>{
    return newsDB.create({...data});
}
const getListNews = async (page=PAGE,limit=LIMIT_NUMBER)=>{
    return newsDB.findAll({
       limit:limit,
       offset:(page-1)*limit,
       order:[["createdAt","DESC"]],
       raw:true
    })
}
const TotalNumberNews = async()=>{
    return newsDB.findAndCountAll({raw:true});
}
module.exports = {
    createNews,
    getListNews,
    TotalNumberNews
}