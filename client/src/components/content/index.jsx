import { Container, Row } from 'react-bootstrap';
import AddButtons from './AddButtons';
import ProjectDetails from './ProjectDetails';
import TodoList from './TodoList';

export default function Content() {
	return (
		<Container id='content' fluid>
			<Row>
				<AddButtons />
			</Row>
			<Row>
				<ProjectDetails />
			</Row>
			<Row>
				<TodoList />
			</Row>
		</Container>
	);
}
