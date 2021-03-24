require('dotenv').config();

const MONGODB = process.env.MONGODB_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;

module.exports = {
	MONGODB,
	JWT_SECRET,
	PORT,
};
