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
	let page = await req.url.substring(1, req.url.length);
	const userData = await DB.findAllEventsByUserID(userId);
	const eventPages = Math.ceil(userData.eventArr.length / 5);
	let pageUserData = new Array();

	if (page == "") {
		let upperCount = 0;
		if (eventPages > 1) {
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

		for (count = 0; count < upperCount; count++) {
			pageUserData[count] = userData.eventArr[page * 5 - 5 + count]
		}

	}

	res.render('pages/index', { user: userData.name, events: pageUserData, all_events: eventPages, date: new Date() });
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

