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
    app.get('/:pageNumber', sessionMiddleware, main.index);
    app.post('/new-event', sessionMiddleware, main.newEvent);
    app.post('/reglog', login.reglog);
    app.post('/logout', main.logout);
    app.post('/edit-event', main.editEvent);
    app.post('/delete-event', main.deleteEvent)

}

module.exports = {
    registerRoutes
}