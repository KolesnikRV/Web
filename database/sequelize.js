var Sequelize = require('sequelize');

var Users;
var Events;

/**
 * 
 * @param {Sequelize.Sequelize} sequelize
 */
var createDataTable = async function(sequelize) {
    Users = sequelize.define('users', {
        email: Sequelize.STRING,
        password: Sequelize.STRING
    });

    Events = sequelize.define('events', {
        userid: Sequelize.STRING,
        eventname: Sequelize.STRING,
        date: Sequelize.DATE,
        event: Sequelize.TEXT
    });

    await sequelize.sync();
}

module.exports = {
    createDataTable,

    Users,
    Events
}