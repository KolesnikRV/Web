var routes = require('./routes.js');
var bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

var registerRoutes  = function(app) {
    app.get('/', routes.login);
    app.get('/index', routes.index);
    app.post('/new-event',urlencodedParser, routes.addEvent);
    app.post('/reglog', urlencodedParser, routes.addEvent);
}

module.exports = {
    registerRoutes
}