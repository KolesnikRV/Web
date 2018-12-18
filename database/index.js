var database = require('./sequelize.js');
var Sequelize = require('sequelize');
//var SequelizeStore = require('connect-session-sequelize')(session.Store);

var sequelize = new
    Sequelize('mysql://root:root@localhost:3306/web');

var data;

const initSequelize = function () {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
        
    data = database.createDataTable(sequelize);
}

module.exports = {
    initSequelize,
    data,
}