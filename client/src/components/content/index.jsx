import { Container } from 'react-bootstrap';
import ProjectDetails from './ProjectDetails';
import TodoList from './TodoList';

export default function Content() {
	return (
		<Container id='main'>
			<ProjectDetails />
			<TodoList />
		</Container>
	);
}
