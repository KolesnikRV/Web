const session = require('express-session');

let UserSession = new Map();

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
    get UserSession(){
        return UserSession;
    },
}