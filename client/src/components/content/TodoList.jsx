import { useSelector, useDispatch } from 'react-redux';
import { toggleCompleted } from '../../redux/slices/todo.slice';

import { Accordion, Badge, Container, Table } from 'react-bootstrap';
import capitalize from '../../utils/capitalize';

import EditTodoModal from './modals/EditTodoModal';
import DeleteTodoModal from './modals/DeleteTodoModal';
import Todo from './TodoItem';

export default function TodoList() {
	const dispatch = useDispatch();

	const currentProject = useSelector(state => state.project.currentProject);
	const todos = useSelector(state => state.todo.data);

	const visibleTodos = todos.filter(todo => todo.project === currentProject.id);

	return (
		<Container id='todo-list'>
			<Accordion defaultActiveKey='0'>
				{visibleTodos.map(todo => (
					<Todo todo={todo} key={todo.id} />
				))}
			</Accordion>
		</Container>
	);
}
