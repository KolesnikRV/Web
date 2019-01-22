const express = require('express');
const app = express();
const database = require('./database_conf.js');
const sessions = require('./sessions');
const routes = require('./ routes');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.set('view engine', 'ejs');
app.set('views', 'app/views');
(async function () {
    await database.initSequelize();
    await sessions.newSession(app);
    await routes.registerRoutes(app);

    app.listen(3000);
    console.log('Server started at 3000 port');
})();
