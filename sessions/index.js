const session = require('express-session');

/**
 * 
 * @param {any} app 
 */
const newSession = async function (app) {

    const newSession = session({
        key: 'user_sid',
        secret: '1ssdgsdgsd342dgrery3',
        resave: false,
        saveUninitialized: true,
        cookie: {
            expires: 60000
        }
    });
    app.use(newSession);
}
module.exports = {
    newSession,
}