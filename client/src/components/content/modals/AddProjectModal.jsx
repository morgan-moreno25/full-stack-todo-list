import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../../../redux/slices/project.slice';

import { Button, Modal, Form } from 'react-bootstrap';
import { clearAlert, updateAlert } from '../../../redux/slices/alert.slice';

export default function AddProjectModal() {
	const dispatch = useDispatch();

	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (!title) {
			return;
		}

		const result = await dispatch(addProject({ title, description }));

		if (addProject.fulfilled.match(result)) {
			const { project } = result.payload;

			dispatch(
				updateAlert({ type: 'success', message: `Successfully added project ${project.title}` })
			);
		} else {
			const { error, message } = result.payload;

			dispatch(updateAlert({ type: 'danger', message: `${error}: ${message}` }));
		}

		setTimeout(() => {
			dispatch(clearAlert());
		}, 10000);

		setTitle('');
		setDescription('');

		toggleModal();
	};

	return (
		<>
			<Button variant='dark' onClick={toggleModal}>
				Add Project +
			</Button>
			<Modal show={isOpen} onHide={toggleModal} centered>
				<Modal.Header closeButton>Enter Project Details</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='text'
								id='title'
								name='title'
								onChange={e => setTitle(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								id='description'
								name='description'
								onChange={e => setDescription(e.target.value)}
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
