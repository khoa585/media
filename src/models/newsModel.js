const {newsDB,newsFields} = require("./../databases/news");

const createNews = async (data)=>{
    return newsDB.create({...data});
}
module.exports = {
    createNews
}