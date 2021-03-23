import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../../redux/slices/todo.slice';
import { updateAlert, clearAlert } from '../../../redux/slices/alert.slice';

import { Modal, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

export default function DeleteTodoModal({ todo }) {
	const dispatch = useDispatch();

	const [modalOpen, setModalOpen] = useState(false);

	const toggleModal = () => setModalOpen(!modalOpen);

	const handleSubmit = async () => {
		const result = await dispatch(deleteTodo({ id: todo.id }));

		if (deleteTodo.fulfilled.match(result)) {
			dispatch(updateAlert({ type: 'success', message: 'Successfully deleted todo' }));
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
			<Button variant='danger' onClick={toggleModal}>
				<FaTrash />
			</Button>
			<Modal show={modalOpen} onHide={toggleModal} centered className='delete-modal'>
				<Modal.Header className='text-danger'>WARNING</Modal.Header>
				<Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
				<Modal.Footer>
					<Button variant='success' onClick={handleSubmit}>
						Yes
					</Button>
					<Button variant='danger' onClick={toggleModal}>
						No
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
