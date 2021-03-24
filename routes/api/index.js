const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/todos', require('./todos'));
router.use('/projects', require('./projects'));

module.exports = router;
