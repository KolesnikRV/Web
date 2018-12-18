var actions = require('./actions.js');
var bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const login = function (req, res) {
	console.log('I am here 1');


	res.render('pages/login');
}

const index = function (req, res) {
	res.render('pages/index');
}

const newEvent = function (req, res) {

}

const reglog = function (req, res) {

	actions.regORlog(req, res);

}

module.exports = {
	login,
	index,
	newEvent,
	reglog,
}

