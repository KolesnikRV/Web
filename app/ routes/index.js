const login = require('./login.js');
const main = require('./main.js');
// const bodyParser = require("body-parser");
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
const sessionMiddleware = function (req, res, next) {
    if (req.session.userId) {
        return next();
    }

    res.redirect('/login');

}

/**
 * 
 * @param {any} app 
 */
const registerRoutes = function (app) {
    app.get('/login', login.login);
    app.get('/', sessionMiddleware, main.index);
    app.get('*', sessionMiddleware, main.index);
    app.post('/new-event', sessionMiddleware, main.newEvent);
    app.post('/reglog', login.reglog);
    app.post('/logout', main.logout);

}

module.exports = {
    registerRoutes
}