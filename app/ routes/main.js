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
	const page = req.params.pageNumber || 1;
	const eventStat = await DB.groupEventsByDate(userId);
	let ADorder;
	let userData;
	let eventPages;
	console.log(req.query.Sort);
	console.log(page);
	console.log(req.params.pageNumber);
	
	if (req.query.eventsOnPage == undefined) { req.query.eventsOnPage = 5; }
	if (req.query.Sort == undefined) { req.query.Sort = "eventname"; }
	if (req.query.Sort == "eventname") { ADorder = "ASC" } else { ADorder = "DESC" }
	userData = await DB.findAllEventsByUserID(userId, Number(req.query.eventsOnPage), (page - 1) * Number(req.query.eventsOnPage), req.query.Sort, ADorder);


	eventPages = Math.ceil(userData.countPages / req.query.eventsOnPage);

	res.render('pages/index', {
		eventsOnPage: req.query.eventsOnPage, sort: req.query.Sort,
		pageNumber: page, user: userData.name, events: userData.eventArr,
		all_events: eventPages, date: new Date(), eventStat : eventStat,
	});
}

/**
 * 
 * @param {any} req 
 * @param {any} res 
 */
const newEvent = async function (req, res) {
	const userId = req.session.userId;
	await DB.addNewEvent(userId, req.body);
	res.redirect('/1');
}

/**
 * 
 * @param {any} req 
 * @param {any} res 
 */
const editEvent = async function (req, res) {
	await DB.editEvent(req.body);
	res.redirect('/1');
}

/**
 * 
 * @param {any} req 
 * @param {any} res 
 */
const deleteEvent = async function (req, res) {
	console.log(req.body.event_id+"-----------")
	await DB.deleteEvent(req.body.event_id);
	res.redirect('/1');
}

module.exports = {
	logout,
	index,
	newEvent,
	editEvent,
	deleteEvent,
}

