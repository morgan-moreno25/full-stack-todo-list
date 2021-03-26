import { useDispatch } from 'react-redux';
import { toggleCompleted } from '../../redux/slices/todo.slice';
import capitalize from '../../utils/capitalize';

import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { FaCaretDown } from 'react-icons/fa';

import EditTodoModal from './modals/EditTodoModal';
import DeleteTodoModal from './modals/DeleteTodoModal';

export default function Todo({ todo }) {
	const dispatch = useDispatch();

	return (
		<Card>
			<Card.Header className={`todo-item ${todo.isComplete ? 'completed' : ''}`}>
				<input
					type='checkbox'
					value={todo.isComplete}
					onChange={() => dispatch(toggleCompleted({ id: todo.id }))}
				/>
				<p>{todo.text}</p>
				<Accordion.Toggle as={Button} variant='success' eventKey={todo.id}>
					<FaCaretDown />
				</Accordion.Toggle>
			</Card.Header>
			<Accordion.Collapse eventKey={todo.id}>
				<Card.Body className='todo-item-details'>
					<p>
						Priority:
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
					</p>
					<p>Due {todo.timeUntilDue}</p>
					<EditTodoModal todo={todo} />
					<DeleteTodoModal todo={todo} />
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
}
