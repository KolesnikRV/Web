var database = require('../database/actions');
function regORlog(req) {

    if (req.body.actiontype == 'register') {
        register(req);
    } else if (req.body.actiontype == 'login') {
        login(req);
    }
}

function register(req) {
    if (database.findUserByID == null) {
        database.addNewUser(req);
        login(req);
    }
}

function login(req) {
    var userData = database.findUserByName(req.sessionID,req.body.login);
    if (userData == null) {
        console.log('user does not exist');
    } else if(database.comparePasswords(req.body.password, userdata.password)){
        
        
    
    }
}

module.exports = {
    regORlog
}