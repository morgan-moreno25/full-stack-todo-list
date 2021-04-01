const mongoose = require('mongoose');
const config = require('./config');

/**
 * @description Establishes connection to the database
 * @returns {Promise<String>}
 */
const connect_db = async () => {
	try {
		await mongoose.connect(config.MONGODB, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		return 'DB Connected...';
	} catch (error) {
		return error;
	}
};

module.exports = connect_db;
