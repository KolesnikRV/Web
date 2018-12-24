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
	const userData = await DB.findAllEventsByUserID(userId);

	res.render('pages/index', { user: userData.name, events: userData.eventArr });
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

		if (req.body.password != user.dataValues.password) {
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

