const db = require("./connectdDb");
const Sequelize = require('sequelize');
const productsFields = {
    id:"id",
    name:"name",
    categoryid:'categoryid',
    price:'price',
    discount:'discount',
    image:'image',
    description:'description',
    detial:'detial'
}
const productsDB = db.define("products",{
    [productsFields.id]:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
    },
    [productsFields.name]:{
        type:Sequelize.TEXT
    },
    [productsFields.categoryid]:{
        type:Sequelize.INTEGER
    },
    [productsFields.price]:{
        type:Sequelize.INTEGER
    },
    [productsFields.discount]:{
        type:Sequelize.INTEGER
    },
    [productsFields.image]:{
        type:Sequelize.TEXT
    },
    [productsFields.description]:{
        type:Sequelize.TEXT
    },
    [productsFields.detial]:{
        type:Sequelize.TEXT
    }

})
productsDB.sync({force:false});
module.exports = {
    productsFields,
    productsDB
}