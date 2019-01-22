const DB = require('../database/actions');

/**
 * 
 * @param {any} req 
 * @param {any} res 
 */
const login = function (req, res) {
	console.log('I am here 1');

	res.render('pages/login');
}

/**
 * 
 * @param {any} req 
 * @param {any} res 
 */
const logout = function (req, res) {
	delete req.session.userId;

	res.redirect('/login')
}

/**
 * 
 * @param {any} req 
 * @param {any} res 
 */
const index = async function (req, res) {
	const userId = req.session.userId;
	let page = await req.url.substring(1, req.url.length);
	const userData = await DB.findAllEventsByUserID(userId);
	const eventPages = Math.ceil(userData.eventArr.length / 5);
	let pageUserData = new Array();
console.log (new Date())
	if (page == "") {
		let upperCount = 0;
		if (eventPages > 0) {
			upperCount = 5;
		} else { upperCount = userData.eventArr.length }

		for (count = 0; count < upperCount; count++) {
			pageUserData[count] = userData.eventArr[count];

		}
	} else {
		let upperCount = 0;
		if (userData.eventArr.length - 5 * page + 5 > 4) {
			upperCount = 5;
		} else { upperCount = userData.eventArr.length - 5 * page + 5 }

		for (count = 0; count < upperCount ; count++) {
			pageUserData[count] = userData.eventArr[page * 5 - 5 + count]
		}

	}

	res.render('pages/index', { user: userData.name, events: pageUserData, all_events: eventPages, date:  new Date() });
}

/**
 * 
 * @param {any} req 
 * @param {any} res 
 */
const newEvent = async function (req, res) {
	const userId = req.session.userId;
	await DB.addNewEvent(userId, req.body);
	res.redirect('/');
}

/**
 * 
 * @param {any} req 
 * @param {any} res 
 */
const reglog = async function (req, res) {
	if (req.body.actiontype == 'register') {
		let user = await DB.findUserByName(req.body.email);
		if (user) {
			res.status(401).send('user already exists');
			return;
		}

		user = await DB.addNewUser(req.body);

		req.session.userId = user.dataValues.id;

		res.redirect('/');
		return;
	} else if (req.body.actiontype == 'login') {
		const user = await DB.findUserByName(req.body.email);
		if (!user) {
			res.status(401).send('invalid username/password');
			return;
		}

		if (!DB.comparePasswords(req.body.password, user.dataValues.password)) {
			res.status(401).send('invalid username/password');
			return;
		}

		req.session.userId = user.dataValues.id;

		res.redirect('/');
		return;
	}

	res.status(401).send('bad action');
}

module.exports = {
	logout,
	login,
	index,
	newEvent,
	reglog,
}

