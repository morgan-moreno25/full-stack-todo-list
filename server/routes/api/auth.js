const router = require('express').Router();

const authController = require('../../controllers/auth.controller');
const { authenticate } = require('../../utils/middleware');

router.get('/login', authController.login);
router.post('/register', authController.register);
router.get('/user', authenticate, authController.loadUser);

module.exports = router;
