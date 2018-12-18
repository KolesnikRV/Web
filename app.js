var express = require('express');
var app = express();
var sessions = require('./sessions');
var routes = require('./ routes');
var database = require('./database');
app.set('view engine', 'ejs');

database.initSequelize();
sessions.newSession(app);
routes.registerRoutes(app,sessions);

app.listen(3000);
console.log('Server started at 3000 port');