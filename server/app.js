const express = require('express');
const cors = require('cors');
const connect_db = require('./utils/db');

const app = express();
connect_db()
	.then(msg => console.log(msg))
	.catch(err => console.log(err));

app.use(express.json());
app.use(cors());

module.exports = app;
