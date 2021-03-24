import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../../../redux/slices/todo.slice';
import { updateAlert, clearAlert } from '../../../redux/slices/alert.slice';

import { Modal, Form, Button } from 'react-bootstrap';

export default function AddTodoModal() {
	const dispatch = useDispatch();

	const currentProject = useSelector(state => state.project.currentProject);
	const otherProjects = useSelector(state => state.project.data).filter(
		project => project.id !== currentProject.id
	);

	const [modalOpen, setModalOpen] = useState(false);
	const [text, setText] = useState('');
	const [priority, setPriority] = useState('low');
	const [dueDate, setDueDate] = useState('');
	const [project, setProject] = useState('');

	useEffect(() => {
		setProject(currentProject.title);
	}, [currentProject]);

	const toggleModal = () => setModalOpen(!modalOpen);

	const handleSubmit = async e => {
		e.preventDefault();

		if (!text || !priority || !dueDate || !project) {
			dispatch(updateAlert({ type: 'danger', message: 'Please include all fields' }));
			setTimeout(() => {
				dispatch(clearAlert());
			}, 5000);
			return;
		}

		const result = await dispatch(addTodo({ text, priority, dueDate, project }));

		if (addTodo.fulfilled.match(result)) {
			dispatch(updateAlert({ type: 'success', message: 'Successfully added todo' }));
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
			<Button variant='success' onClick={toggleModal}>
				Add Todo +
			</Button>
			<Modal show={modalOpen} onHide={toggleModal} centered className='add-modal'>
				<Modal.Header closeButton>Enter Todo Details</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>Text</Form.Label>
							<Form.Control
								type='text'
								id='text'
								name='text'
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
								onChange={e => setDueDate(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Project</Form.Label>
							<Form.Control
								as='select'
								id='project'
								name='project'
								defaultValue={currentProject.title}
								onChange={e => setProject(e.target.value)}>
								<option value={currentProject.title}>{currentProject.title}</option>
								{otherProjects.map(project => (
									<option value={project.title}>{project.title}</option>
								))}
							</Form.Control>
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
