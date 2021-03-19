const router = require('express').Router();

const { authenticate } = require('../../utils/middleware');
const todosController = require('../../controllers/todo.controller');

router.get('/', authenticate, todosController.getAllTodos);
router.post('/', authenticate, todosController.addTodo);
router.put('/:id', authenticate, todosController.updateTodo);
router.delete('/:id', authenticate, todosController.deleteTodo);

module.exports = router;
