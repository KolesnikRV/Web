const database = require('./sequelize.js');
const Sequelize = require('sequelize');
//var SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = new Sequelize('mysql://root:root@localhost:3306/web');

const initSequelize = async function () {
    await sequelize.authenticate();

    await database.createDataTable(sequelize);
}

module.exports = {
    initSequelize,
}