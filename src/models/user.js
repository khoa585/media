const Sequelize = require('sequelize');
const db = require("./connectdDb");
const UsersDB=  db.define('users',{
    usename: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
})
UsersDB.sync({force:false})
module.exports =  UsersDB