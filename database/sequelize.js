const Sequelize = require('sequelize');

let Users;
let Events;

/**
 * 
 * @param {Sequelize.Sequelize} sequelize
 */
const createDataTable = async function (sequelize) {
    Users = sequelize.define('users', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
        email: Sequelize.STRING,
        password: Sequelize.STRING,

    });

    Events = sequelize.define('events', {
        //userid: Sequelize.INTEGER,
        eventname: Sequelize.STRING,
        date: Sequelize.DATE,
        event: Sequelize.TEXT
    });

    Events.belongsTo(Users);

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