const db = require("./connectdDb");
const Sequelize = require('sequelize');
const categoryFields = {
    id:"id",
    name:"name",
    slug:"slug"
}
const categoryDB = db.define("category",{
    [categoryFields.id]:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
    },
    [categoryFields.name]:{
        type:Sequelize.TEXT
    },
    [categoryFields.slug]:{
        type:Sequelize.TEXT
    }
})
categoryDB.sync({force:false});
module.exports = {
    categoryFields,
    categoryDB
}