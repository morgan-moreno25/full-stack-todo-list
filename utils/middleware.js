const { Request, Response, NextFunction } = require('express');

const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const moment = require('moment');

/**
 * @description Creates a custom timestamp from the current datetime
 * @returns {String} Current timestamp formatted as HH:MM
 */
const useTimestamp = () => {
	const timestamp = `${moment().hours()}:${moment().minutes()}`;
	return timestamp;
};

/**
 * @description Validates a JWT and provides following functions with a req.user object containing user information
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
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

/**
 * @description Logs the current request and it's accompanying body
 * @param {Request} req Express request logger
 * @param {Response} res Express response logger
 * @param {NextFunction} next Express next function
 */
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
