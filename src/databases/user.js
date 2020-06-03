const Sequelize = require('sequelize');
const db = require("./connectdDb");
const UsersDB=  db.define('users',{
    id:{
      type:Sequelize.DataTypes.INTEGER ,
      primaryKey:true
    },
    usename: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
})
UsersDB.sync({force:false})
module.exports =  UsersDB