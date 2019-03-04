const bcrypt = require('bcrypt');
const DB = require('../../migrations/sequelize.js');
require('dotenv').config();


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
const findAllEventsByUserID = async function (userId, limit, offset, order, ADorder) {

    const event = await DB.Events.findAndCountAll({ where: { userId: userId }, limit, offset, order: [[order, ADorder]] });
    if (event == null) {
        return null;
    } else {
        function TempEvents(name, event, date, eventID) {
            this.name = name;
            this.event = event;
            this.date = date;
            this.id = eventID;
        };
        let eventArr = new Array();

        for (i = 0; i < event.rows.length; i++) {

            eventArr[i] = new TempEvents(event.rows[i].dataValues.eventname, event.rows[i].dataValues.event, event.rows[i].dataValues.date, event.rows[i].dataValues.id);
            console.log(eventArr[i]);
        }

        const userName = await getUserName(userId);


        return { name: userName, eventArr: eventArr, countPages: event.count };
    }

}

const comparePasswords = async function (form_password, DB_password) {

    return await bcrypt.compare(form_password, DB_password);

}

/**
 * 
 * @param {any} body 
 */
const addNewUser = async function (body) {
    let BCRYPT_SALT_ROUNDS = await parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    return await DB.Users.create({
        email: body.email,
        password: await bcrypt.hash(body.password, BCRYPT_SALT_ROUNDS),
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

/**
 * 
 * @param {any} body  
 */
const editEvent = async function (body) {
    console.log ('hello I am here')
    return await DB.Events.update({
        eventname: body.event_name,
        event: body.event_description,
        date: body.event_date,
    }, { where: { id: body.event_id } });

}

/**
 * 
 * @param {any} eventId 
 */
const deleteEvent = async function (eventId) {
    return await DB.Events.destroy({ where: { id: eventId } });
}

module.exports = {
    comparePasswords,
    findUserByName,
    findAllEventsByUserID,
    addNewUser,
    addNewEvent,
    editEvent,
    deleteEvent,
}