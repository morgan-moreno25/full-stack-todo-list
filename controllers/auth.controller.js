const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const userExists = await User.findByUsername(username);

		if (userExists) {
			const isMatch = await bcrypt.compare(password, userExists.passwordHash);

			if (isMatch) {
				const token = await jwt.sign({ id: userExists._id }, config.JWT_SECRET);

				return res.status(200).json({
					token,
					user: userExists,
				});
			} else {
				return res.status(400).json({
					error: 'invalid_credentials',
					message: 'Password is incorrect',
				});
			}
		} else {
			return res.status(400).json({
				error: 'invalid_credentials',
				message: `User with username ${username} does not exist`,
			});
		}
	} catch (error) {
		return res.status(500).json({
			error: 'server_error',
			message: error.message,
		});
	}
};
const register = async (req, res) => {
	const { username, password } = req.body;

	try {
		const userExists = await User.findByUsername(username);

		if (userExists) {
			return res.status(400).json({
				error: 'validation_error',
				message: `User with username ${username} already exists`,
			});
		} else {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			const newUser = new User({
				username,
				passwordHash: hash,
			});

			const user = await newUser.save();

			const token = await jwt.sign({ id: user._id }, config.JWT_SECRET);

			return res.status(201).json({
				token,
				user,
			});
		}
	} catch (error) {
		return res.status(500).json({
			error: 'server_error',
			message: error.message,
		});
	}
};
const loadUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		if (user) {
			return res.status(200).json({ user });
		} else {
			return res.status(401).json({
				error: 'invalid_id',
				message: `User with id ${id} not found`,
			});
		}
	} catch (error) {
		return res.status(500).json({
			error: 'server_error',
			message: error.message,
		});
	}
};

module.exports = {
	loadUser,
	login,
	register,
};
