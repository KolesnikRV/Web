const actions = require('./actions.js');

const login = function (req, res) {
	console.log('I am here 1');


	res.render('pages/login');
}

const index = function (req, res) {

	res.redirect('pages/index');
}

const newEvent = function (req, res) {
	res.render('pages/index');
}

const reglog = async function (req, res) {
	const pageData = await actions.regORlog(req);
	if (pageData  == null) {
		res.render('pages/login');
	} else {
		res.render('pages/index', { user: 1, events: pageData });
	}
}

module.exports = {
	login,
	index,
	newEvent,
	reglog,
}

