const jwt = require('jsonwebtoken');
const config = require('../utils/config');

module.exports = authenticate = async (req, res, next) => {
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
