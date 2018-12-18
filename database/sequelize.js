function createDataTable(sequelize) {
    var Users = sequelize.define('users', {
        email: Sequelize.STRING,
        password: Sequelize.STRING
    });

    var Events = sequelize.define('events', {
        userid: Sequelize.STRING,
        eventname: Sequelize.STRING,
        date: Sequelize.DATE,
        event: Sequelize.TEXT
    });
    sequelize.sync();
    return data = {
        Users,
        Events,
    }
}