var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require("body-parser");
var session = require('express-session');
var app = express();
app.set('view engine', 'ejs');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

// User session \\
app.use(session({
	key: 'user_sid',
	secret: '1',
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 600000
	}
}));

// \\

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
	date: Sequelize.DATE,
	event: Sequelize.TEXT
});
sequelize.sync();
// \\

// 
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// \\

app.get('/', function (req, res) {
	res.render('pages/login');
});

app.get('/index', function (req, res) {
	res.render('pages/index');
});

app.post('/auth', urlencodedParser, function (req, res) {

	Users.findOne({ where: { email: req.body.email } }).then(function (user) {

		if (req.body.actiontype == 'register') {
			console.log('registeration-------')
			if (user == null) {
				Users.create({
					email: req.body.email,
					password: req.body.password
				}).catch((err) => {
					console.log(err);
					res.render('pages/login');
				});
				Users.findOne({ where: { email: req.body.email } }).then(function (user) {
					session.id = user.dataValues.id;
					console.log(session.id);
				});
				res.render('pages/index');
			} else res.render('pages/login');


		} else if (req.body.actiontype == 'login') {
			console.log('login-------')
			if (user == null) {

				console.log('user does not exist');
				res.render('pages/login');
			} else {
				session.id = user.dataValues.id;
				console.log(session.id);
				res.redirect('/index');
			}
		}

	}); //findAll

});

app.listen(3000);
console.log('Server started at 3000 port');