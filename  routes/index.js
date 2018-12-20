const routes = require('./routes.js');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const sessionMiddleware = function(req, res, next) {
    if (req.session.userId){
        return next();
    }

    res.redirect('/login');

}

var registerRoutes  = function(app) {
    app.get('/login', routes.login);
    app.get('/', sessionMiddleware, routes.index);
    app.post('/new-event', sessionMiddleware, urlencodedParser, routes.newEvent);
    app.post('/reglog', urlencodedParser, routes.reglog);
    app.post('/logout', routes.logout);
    
}

module.exports = {
    registerRoutes
}