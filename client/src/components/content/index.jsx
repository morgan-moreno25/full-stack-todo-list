import { Container } from 'react-bootstrap';
import AddTodoModal from './modals/AddTodoModal';
import ProjectDetails from './ProjectDetails';
import TodoList from './TodoList';

export default function Content() {
	return (
		<Container>
			<ProjectDetails />
			<AddTodoModal />
			<TodoList />
		</Container>
	);
}
