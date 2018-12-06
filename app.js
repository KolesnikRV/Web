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

var Users = sequelize.define ('users',{
	email: Sequelize.STRING,
	password: Sequelize.STRING
});

var Events = sequelize.define ('events',{
	userid: Sequelize.STRING,
	date: Sequelize.DATE,
	event: Sequelize.TEXT
});
sequelize.sync();
// \\

// 
const urlencodedParser = bodyParser.urlencoded({extended: false});
// \\

app.get('/', function(req, res) {
	res.render('pages/login');
});

app.get('/index', function(req, res) {
	res.render('pages/index');
});

app.post('/index', urlencodedParser, function(req, res){
	
	if (req.body.actiontype == 'register'){

		Users.create({
		email : req.body.email,
		password : req.body.password

		}).then(user => {
			req.session.user = user.dataValue;
			console.log(req);
			res.redirect('/index');
	})
		.catch((err) => {
			console.log(err);
			res.redirect('/login');
		});

	}else if (req.body.actiontype == 'login'){
				
	if	(Users.findOne({where:{email: req.body.email}}) == null){
		console.log('user does not exist');
		res.render('pages/login');
	} else {
			req.session.key = Users.findOne({where:{email: req.body.email}}).id;
			res.redirect('/index');	}
	 }
});

app.listen(3000);
console.log('Server started at 3000 port');