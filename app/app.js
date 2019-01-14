const express = require('express');
const app = express();
const database = require('./database');
const sessions = require('./sessions');
const routes = require('./ routes');
app.set('view engine', 'ejs');

(async function(){
    await database.initSequelize();
    await sessions.newSession(app);
    await routes.registerRoutes(app);

    app.listen(3000);
    console.log('Server started at 3000 port');    
})();
