const Sequelize = require('sequelize');

let Users;
let Events;

/**
 * 
 * @param {Sequelize.Sequelize} sequelize
 */
const createDataTable = async function (sequelize) {
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
    get Users() {
        return Users;
    },
    get Events() {
        return Events;
    }
}