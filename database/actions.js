var data = require('./index');
var session = require('../sessions');

function findUserByName(sessionID, username) {
    data.data.findOne({ where: { email: username } }).then(function (user) {

        session.UserSession.set(sessionID, UserData = [user.dataValues.id]);

        findAllEvents(res);
    })
}

function findAllEventsByUserID(sessionID, userid) {

    data.data.Events.findAll({ where: { userid: session.UserSession.get(sessionID) } }).then(function (event) {

        function TempEvents(name, event) {
            this.name = name;
            this.event = event;
        };
        var eventArr = new Array();

        for (i = 0; i < event.length; i++) {

            eventArr[i] = new TempEvents('1~', event[i].dataValues.event);
            console.log(eventArr[i]);
        }
        //res.render('pages/index', { user: TemporaryEmail, events: eventArr });
    });

}

function comparePasswords(pswd1, pswd2) {

    if (pswd1 == pswd2) {
        return true;
    } else return false;

}

function addNewUser() {

}

function addNewEvent(userid) {

}

module.exports = {
    comparePasswords,
    findUserByName,
    findAllEventsByUserID,
    addNewUser,
    addNewEvent,
    addNewUser,
    addNewEvent,
}