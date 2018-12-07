var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require("body-parser");
var session = require('express-session');
var app = express();
app.set('view engine', 'ejs');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

// Database \\

var sequelize = new
	Sequelize('mysql://root:root@localhost:3306/web');

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

var Users = sequelize.define('users', {
	email: Sequelize.STRING,
	password: Sequelize.STRING
});

var Events = sequelize.define('events', {
	userid: Sequelize.STRING,
	eventname: Sequelize.STRING,
	date: Sequelize.DATE,
	event: Sequelize.TEXT
});
sequelize.sync();
// \\

// User session \\
app.use(session({
	key: 'user_sid',
	secret: '1',
	resave: false,
	saveUninitialized: false,
	cookie: {
		userid: -1
	}
}));

TemporaryID = 0;
TemporaryEmail = 0;


// \\


// 
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// \\

app.get('/', function (req, res) {
	res.redirect('pages/login');
});

app.get('/index', function (req, res) {

	res.redirect('pages/index');
});


app.post('/new-event', urlencodedParser, function (req, res) {

	Users.findOne({ where: { id: TemporaryID } }).then(function (user) {
		console.log(TemporaryID);
		Events.create({
			userid: user.dataValues.id,
			eventname: req.body.event_name,
			event: req.body.event_description

		}).catch((err) => {
			console.log(err);
			res.render('/index');
		});
	});
	findAllEvents(res);
});

app.post('/index', urlencodedParser, function (req, res) {

	Users.findOne({ where: { email: req.body.email } }).then(function (user) {

		if (req.body.actiontype == 'register') {
			console.log('registeration-------')
			if (user == null) {
				Users.create({
					email: req.body.email,
					password: req.body.password
				}).catch((err) => {
					console.log(err);
					Users.findOne({ where: { email: req.body.email } }).then(function (user) {
						TemporaryID = user.dataValues.id;
					});
					TemporaryEmail = req.body.email;
					findAllEvents(res);
				});
				res.render('pages/index');
			} else res.render('pages/login');
		} else if (req.body.actiontype == 'login') {
			console.log('login-------');
			if (user == null) {
				console.log('user does not exist');
				res.render('pages/login');
			} else {
				TemporaryEmail = user.dataValues.email;
				TemporaryID = user.dataValues.id;
				req.session.save();
				console.log(TemporaryID);
				findAllEvents(res);
			}
		}

	}); //findAll
});

function findAllEvents(res) {
	Events.findAll({ where: { userid: TemporaryID } }).then(function (event) {

		function TempEvents(name, event) {
			this.name = name;
			this.event = event;
		};
		var eventArr = new Array();

		for (i = 0; i < event.length; i++) {

			eventArr[i] = new TempEvents('1~', event[i].dataValues.event);
			console.log(eventArr[i]);
		}
		res.render('pages/index', { user: TemporaryEmail, events: eventArr });
	});
}

app.listen(3000);
console.log('Server started at 3000 port');