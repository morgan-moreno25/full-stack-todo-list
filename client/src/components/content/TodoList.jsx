import { useSelector, useDispatch } from 'react-redux';
import { toggleCompleted } from '../../redux/slices/todo.slice';

import { Badge, Table } from 'react-bootstrap';
import capitalize from '../../utils/capitalize';

import EditTodoModal from './modals/EditTodoModal';
import DeleteTodoModal from './modals/DeleteTodoModal';

export default function TodoList() {
	const dispatch = useDispatch();

	const currentProject = useSelector(state => state.project.currentProject);
	const todos = useSelector(state => state.todo.data);

	const visibleTodos = todos.filter(todo => todo.project === currentProject.id);

	return (
		<div id='todo-list'>
			<Table hover size='sm'>
				<tbody>
					{visibleTodos.map(todo => (
						<tr className='todo-item'>
							<td>
								<input
									type='checkbox'
									checked={todo.isComplete}
									onChange={() => dispatch(toggleCompleted({ id: todo.id }))}
								/>
							</td>
							<td>{todo.text}</td>
							<td>
								<Badge
									pill
									variant={
										todo.priority === 'low'
											? 'secondary'
											: todo.priority === 'medium'
											? 'warning'
											: 'danger'
									}>
									{capitalize(todo.priority)}
								</Badge>
							</td>
							<td>Due {todo.timeUntilDue}</td>
							<td>
								<EditTodoModal todo={todo} />
							</td>
							<td>
								<DeleteTodoModal todo={todo} />
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}
