const router = require('express').Router();

const authController = require('../../../controllers/auth.controller');
const { authenticate } = require('../../../utils/middleware');

/**
 * @method POST /api/v1/auth/login
 * @description Login a user
 * @access Public
 */
router.post('/login', authController.login);
/**
 * @method POST /api/v1/auth/register
 * @description Register a user
 * @access Public
 */
router.post('/register', authController.register);
/**
 * @method GET /api/v1/auth/user
 * @description Load a user
 * @access Public | Auth
 */
router.get('/user', authenticate, authController.loadUser);

module.exports = router;
