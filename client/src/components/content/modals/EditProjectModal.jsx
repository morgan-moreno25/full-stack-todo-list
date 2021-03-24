import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProject } from '../../../redux/slices/project.slice';
import { updateAlert, clearAlert } from '../../../redux/slices/alert.slice';

import { Modal, Button, Form } from 'react-bootstrap';

export default function EditProjectModal() {
	const dispatch = useDispatch();

	const currentProject = useSelector(state => state.project.currentProject);

	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		setTitle(currentProject.title);
		setDescription(currentProject.description);
	}, [currentProject]);

	const toggleModal = () => setIsOpen(!isOpen);

	const handleSubmit = async e => {
		e.preventDefault();

		const result = await dispatch(
			updateProject({ id: currentProject.id, project: { title, description } })
		);

		if (updateProject.fulfilled.match(result)) {
			const { updatedProject } = result.payload;
			console.log(updatedProject);

			dispatch(
				updateAlert({
					type: 'success',
					message: `Successfully updated project ${updatedProject.title}`,
				})
			);
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
				Edit
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
								value={title}
								onChange={e => setTitle(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								id='description'
								name='description'
								defaultValue={description}
								onChange={e => setDescription(e.target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='primary' onClick={handleSubmit} className='modal-btn'>
						Submit
					</Button>
					<Button variant='danger' onClick={toggleModal} className='modal-btn'>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
