const Sequelize = require("sequelize");
require("dotenv").config();


const sequelize = new Sequelize(process.env.DATA_BASE_URL, {
    logging: false,
    host: 'localhost',
    dialect: 'mysql', // Or your preferred database dialect
});

module.exports = { sequelize };
