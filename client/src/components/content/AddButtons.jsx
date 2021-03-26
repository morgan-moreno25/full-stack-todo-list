import AddProjectModal from './modals/AddProjectModal';
import AddTodoModal from './modals/AddTodoModal';
import { Container } from 'react-bootstrap';

export default function AddButtons() {
	return (
		<Container id='add-buttons'>
			<AddProjectModal />
			<AddTodoModal />
		</Container>
	);
}
