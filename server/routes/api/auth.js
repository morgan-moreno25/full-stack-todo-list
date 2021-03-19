const router = require('express').Router();

const authController = require('../../controllers/auth.controller');

router.get('/login', authController.login);
router.post('/register', authController.register);
router.get('/user', authController.loadUser);

module.exports = router;
