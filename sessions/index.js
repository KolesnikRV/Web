var session = require('express-session');

var UserSession = new Map();

newSession = function (app) {
    app.use(session({
        key: 'user_sid',
        secret: '1',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000
        }
    }));
}
module.exports = {
    newSession,
    UserSession,
}