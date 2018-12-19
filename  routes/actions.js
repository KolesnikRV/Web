const database = require('../database/actions');


const regORlog = async function (req) {

    if (req.body.actiontype == 'register') {
       return await register(req);
    } else if (req.body.actiontype == 'login') {
       return await login(req);
    }
}

const register = async function (req) {
    const user = await database.findUserByName(req.sessionID, req.body.email);

    if (user == null) {
        await database.addNewUser(req.body);

        return await login(req);
    }

    return null;
}

const login = async function (req) {
    
    let userData = await database.findUserByName(req.sessionID, req.body.email);
    if (userData == null) {
        console.log('user does not exist');
        return null;
    } else if (await database.comparePasswords(req.body.password, userData.dataValues.password)) {

        return await database.findAllEventsByUserID(userData.dataValues.id);
    }
}
module.exports = {
    regORlog
}