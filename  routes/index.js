const routes = require('./routes.js');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

var registerRoutes  = function(app) {
    app.get('/', routes.login);
    app.get('/index', routes.index);
    app.post('/new-event',urlencodedParser, routes.newEvent);
    app.post('/reglog', urlencodedParser, routes.reglog);
}

module.exports = {
    registerRoutes
}