const DB = require('../actions/actions.js');

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
	const page = await req.url.substring(1, req.url.length);
	let userData;
	let eventPages;

	console.log(await DB.findAllEventsByUserID(userId, 5, 15))

	if (page == "") {
		
		userData = await DB.findAllEventsByUserID(userId, 5, 0);

	} else {

		userData = await DB.findAllEventsByUserID(userId, 5, (page - 1) * 5);

	}
	eventPages = Math.ceil(userData.countPages / 5);

	res.render('pages/index', { user: userData.name, events: userData.eventArr, all_events: eventPages, date: new Date() });
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

module.exports = {
	logout,
	index,
	newEvent,
}

