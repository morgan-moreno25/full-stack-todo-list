const router = require('express').Router();

const { authenticate } = require('../../../utils/middleware');
const todosController = require('../../../controllers/todo.controller');

/**
 * @method GET /api/v1/todos
 * @description Get all todos
 * @access Public | Auth
 */
router.get('/', authenticate, todosController.getAllTodos);
/**
 * @method POST /api/v1/todos
 * @description Create a new todo
 * @access Public | Auth
 */
router.post('/', authenticate, todosController.addTodo);
/**
 * @method POST /api/v1/todos/toggleCompleted/:id
 * @description Toggle the isCompleted property of a single todo
 * @access Public | Auth
 */
router.post('/toggleCompleted/:id', authenticate, todosController.toggleCompleted);
/**
 * @method PUT /api/v1/todos/:id
 * @description Update a single todo
 * @access Public | Auth
 */
router.put('/:id', authenticate, todosController.updateTodo);
/**
 * @method DELETE /api/v1/todos/:id
 * @description Delete a single todo
 * @access Public | Auth
 */
router.delete('/:id', authenticate, todosController.deleteTodo);

module.exports = router;
