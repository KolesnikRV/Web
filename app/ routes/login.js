const DB = require('../actions/actions.js');

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
	login,
	reglog,
}

