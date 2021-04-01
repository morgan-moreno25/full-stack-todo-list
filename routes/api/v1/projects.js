const router = require('express').Router();

const { authenticate } = require('../../../utils/middleware');
const projectController = require('../../../controllers/project.controller');

/**
 * @method GET /api/v1/projects
 * @description Get all projects
 * @access Public | Auth
 */
router.get('/', authenticate, projectController.getAllProjects);
/**
 * @method POST /api/v1/projects
 * @description Create a new project
 * @access Public | Auth
 */
router.post('/', authenticate, projectController.addProject);
/**
 * @method PUT /api/v1/projects/:id
 * @description Update a single project
 * @access Public | Auth
 */
router.put('/:id', authenticate, projectController.updateProject);
/**
 * @method DELETE /api/v1/projects/:id
 * @description Delete a single project
 * @access Public | Auth
 */
router.delete('/:id', authenticate, projectController.deleteProject);

module.exports = router;
