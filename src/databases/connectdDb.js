require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    host:process.env.DB_HOST ,
    port:process.env.DB_PORT,
    username:process.env.DB_USERNAME ,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE ,
    dialect:process.env.DB_DIALECT,
});
sequelize.authenticate().then(() => {
    console.log('Connection successfully.');
})
    .catch((err) => {
        console.log('Connection Fail. ', err);
    });
module.exports = sequelize