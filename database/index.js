const database = require('./sequelize.js');
const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(''+process.env.DB+'://'+process.env.DB_USER+
':'+process.env.DB_PASS+'@'+process.env.DB_HOST+':'+process.env.DB_PORT+'/web');

const initSequelize = async function () {
    await sequelize.authenticate();

    await database.createDataTable(sequelize);
}

module.exports = {
    initSequelize,
}