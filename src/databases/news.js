const Sequelize = require('sequelize');
const db = require("./connectdDb");
const newsFields = {
    id:"id",
    title:"title",
    image:'image',
    description:'description',
    html:'html'
}
 const newsDB  = db.define('news',{
    [newsFields.id]:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
    },
    [newsFields.title]:{
        type:Sequelize.DataTypes.TEXT
    },
    [newsFields.image]:{
        type:Sequelize.DataTypes.TEXT
    },
    [newsFields.description]:{
        type:Sequelize.DataTypes.TEXT
    },
    [newsFields.html]:{
        type:Sequelize.DataTypes.TEXT
    },
})
newsDB.sync({force:false})
module.exports ={
    newsFields,
    newsDB
}