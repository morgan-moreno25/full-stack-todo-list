import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Table, Button } from 'react-bootstrap';
import { FaRegEdit, FaTrash } from 'react-icons/fa';

import EditTodoModal from './modals/EditTodoModal';
import DeleteTodoModal from './modals/DeleteTodoModal';

export default function TodoList() {
	const dispatch = useDispatch();

	const currentProject = useSelector(state => state.project.currentProject);
	const currentTodo = useSelector(state => state.todo.currentTodo);
	const todos = useSelector(state => state.todo.data);

	const visibleTodos = todos.filter(todo => todo.project === currentProject.id);

	return (
		<Table hover size='sm'>
			<tbody>
				{visibleTodos.map(todo => (
					<tr className='todo-item'>
						<td>
							<input type='checkbox' checked={todo.isComplete} onChange={() => {}} />
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
								{todo.priority}
							</Badge>
						</td>
						<td>Due: {todo.timeUntilDue}</td>
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
	);
}
