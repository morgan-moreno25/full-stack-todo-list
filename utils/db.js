const mongoose = require('mongoose');
const config = require('./config');

module.exports = connect_db = async () => {
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
