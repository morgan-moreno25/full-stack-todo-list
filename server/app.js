const express = require('express');
const cors = require('cors');
const connect_db = require('./utils/db');
const { requestLogger } = require('./utils/middleware');

const app = express();
connect_db()
	.then(msg => console.log(msg))
	.catch(err => console.log(err));

app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.use('/', require('./routes'));

module.exports = app;
