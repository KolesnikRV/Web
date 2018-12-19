const { Users, Events } = require('./sequelize');
const { UserSession } = require('../sessions');

const findUserByName = async function (sessionID, username) {
    const user = await Users.findOne({ where: { email: username } });

    session.UserSession.set(sessionID, user.dataValues.id);

    return user;
}

const findAllEventsByUserID = async function (sessionID) {

    const event = await Events.findAll({userid: UserSession.get(sessionID)});
  
        if (event == null) {
            return null;
        } else {
            let TempEvents = { name, eventData };
            let eventArr = new Array();

            for (i = 0; i < event.length; i++) {

                eventArr[i] = new TempEvents(event[i].dataValues.eventname, event[i].dataValues.event);
                console.log(eventArr[i]);
            }

            return eventArr;
            //res.render('pages/index', { user: TemporaryEmail, events: eventArr });
        }
    
}

const comparePasswords = async function (pswd1, pswd2) {

    if (pswd1 == pswd2) {
        return true;
    } else return false;

}

const addNewUser = async function (body) {
    await Users.create({
        email: body.email,
        password: body.password
    });

}


const addNewEvent = async function (userid, body) {
    await Events.create({
        userid: userid,
        eventname: body.event_name,
        event: body.event_description
    });
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