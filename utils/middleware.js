const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const moment = require('moment');

const useTimestamp = () => {
	const timestamp = `${moment().hours()}:${moment().minutes()}`;
	return timestamp;
};

const authenticate = async (req, res, next) => {
	let token = req.get('Authorization');

	if (token) {
		const decoded_token = await jwt.verify(token, config.JWT_SECRET);

		req.user = decoded_token;

		next();
	} else {
		return res.status(400).json({
			error: 'authorization_required',
			message: 'Authorization token is required',
		});
	}
};

const requestLogger = (req, res, next) => {
	const timestamp = useTimestamp();
	console.log(`[${timestamp}] - ${req.method} ${req.path}`);
	console.log(`[${timestamp}] - Body: `, req.body);
	next();
};

module.exports = {
	authenticate,
	requestLogger,
};
