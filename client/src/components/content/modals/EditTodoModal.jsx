import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo } from '../../../redux/slices/todo.slice';
import { updateAlert, clearAlert } from '../../../redux/slices/alert.slice';

import { Modal, Form, Button } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';

export default function EditTodoModal({ todo }) {
	const dispatch = useDispatch();

	const currentProject = useSelector(state => state.project.currentProject);

	const [modalOpen, setModalOpen] = useState(false);
	const [text, setText] = useState('');
	const [priority, setPriority] = useState('');
	const [dueDate, setDueDate] = useState('');

	useEffect(() => {
		setText(todo.text);
		setPriority(todo.priority);
		setDueDate(todo.dueDate);
	}, [todo]);

	const toggleModal = () => setModalOpen(!modalOpen);

	const handleSubmit = async e => {
		e.preventDefault();

		const result = await dispatch(
			updateTodo({ id: todo.id, todo: { text, priority, dueDate, project: currentProject.title } })
		);

		if (updateTodo.fulfilled.match(result)) {
			dispatch(updateAlert({ type: 'success', message: 'Successfully updated' }));
		} else {
			const { error, message } = result.payload;

			dispatch(updateAlert({ type: 'danger', message: `${error}: ${message}` }));
		}

		setTimeout(() => {
			dispatch(clearAlert());
		}, 10000);

		toggleModal();
	};

	return (
		<>
			<Button variant='warning' onClick={toggleModal}>
				<FaRegEdit />
			</Button>
			<Modal show={modalOpen} onHide={toggleModal} centered>
				<Modal.Header closeButton>Enter Todo Details</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>Text</Form.Label>
							<Form.Control
								type='text'
								name='text'
								id='text'
								value={text}
								onChange={e => setText(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Priority</Form.Label>
							<Form.Control
								as='select'
								name='priority'
								id='priority'
								defaultValue={priority}
								onChange={e => setPriority(e.target.value)}>
								<option value='low'>Low</option>
								<option value='medium'>Medium</option>
								<option value='high'>High</option>
							</Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Due Date</Form.Label>
							<Form.Control
								type='date'
								name='dueDate'
								id='dueDate'
								defaultValue={dueDate}
								onChange={e => setDueDate(e.target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='primary' onClick={handleSubmit}>
						Submit
					</Button>
					<Button variant='danger' onClick={toggleModal}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
