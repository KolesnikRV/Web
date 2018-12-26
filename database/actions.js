const DB = require('./sequelize');

/**
 * 
 * @param {any} username 
 */
const findUserByName = async function (username) {
    const user = await DB.Users.findOne({ where: { email: username } });

    return user;
}

/**
 * 
 * @param {any} userId 
 */
const findAllEventsByUserID = async function (userId) {

    const event = await DB.Events.findAll({ where: { userId: userId }});

    if (event == null) {
        return null;
    } else {
        function TempEvents(name, event, date) {
            this.name = name;
            this.event = event;
            this.date = date;
        };
        let eventArr = new Array();

        for (i = 0; i < event.length; i++) {

            eventArr[i] = new TempEvents(event[i].dataValues.eventname, event[i].dataValues.event, event[i].dataValues.date );
            console.log(eventArr[i]);
        }

        const userName = await getUserName(userId);
        

        return { name: userName, eventArr: eventArr };
        //res.render('pages/index', { user: TemporaryEmail, events: eventArr });
    }

}

// const comparePasswords = function (pswd1, pswd2) {

//     if (pswd1 == pswd2) {
//         return true;
//     } else return false;

// }

/**
 * 
 * @param {any} body 
 */
const addNewUser = async function (body) {
    return await DB.Users.create({
        email: body.email,
        password: body.password
    });
}

/**
 * 
 * @param {any} userId 
 * @param {any} body 
 */
const addNewEvent = async function (userId, body) {
    return await DB.Events.create({
        userId: userId,
        eventname: body.event_name,
        event: body.event_description,
        date: body.event_date,
    });
}

/**
 * 
 * @param {any} userId 
 */
const getUserName = async function (userId) {
    const user = await DB.Users.findOne({ where: { id: userId } });

    return user.dataValues.email;
}

module.exports = {
    // comparePasswords,
    findUserByName,
    findAllEventsByUserID,
    addNewUser,
    addNewEvent,
}