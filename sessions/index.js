var session = require('express-session');

var UserSession = new Map();

const newSession = async function (app) {
    app.use(await session({
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