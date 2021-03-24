const router = require('express').Router();

const { authenticate } = require('../../utils/middleware');
const projectController = require('../../controllers/project.controller');

router.get('/', authenticate, projectController.getAllProjects);
router.post('/', authenticate, projectController.addProject);
router.put('/:id', authenticate, projectController.updateProject);
router.delete('/:id', authenticate, projectController.deleteProject);

module.exports = router;
