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
    [newsFiels.id]:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
    },
    [newsFiels.title]:{
        type:Sequelize.DataTypes.TEXT
    },
    [newsFiels.image]:{
        type:Sequelize.DataTypes.TEXT
    },
    [newsFiels.description]:{
        type:Sequelize.DataTypes.TEXT
    },
    [newsFiels.html]:{
        type:Sequelize.DataTypes.TEXT
    },
})
newsDB.sync({force:false})
module.exports ={
    newsFields,
    newsDBx
}