const express = require('express');
const cors = require('cors');
const connect_db = require('./utils/connect_db');
const { requestLogger } = require('./utils/middleware');

const app = express();
connect_db()
	.then(msg => console.log(msg))
	.catch(err => console.log(err));

app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.use('/', require('./routes'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

module.exports = app;
