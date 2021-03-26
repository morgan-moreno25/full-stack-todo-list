import { useSelector } from 'react-redux';

import { Card, Container } from 'react-bootstrap';
import EditProjectModal from './modals/EditProjectModal';
import DeleteProjectModal from './modals/DeleteProjectModal';

export default function ProjectDetails() {
	const { currentProject } = useSelector(state => state.project);

	return (
		<Container id='project-details'>
			<Card>
				<Card.Body>
					<Card.Title>{currentProject.title}</Card.Title>
					<Card.Text>{currentProject.description}</Card.Text>
				</Card.Body>
				<Card.Footer>
					<EditProjectModal />
					<DeleteProjectModal />
				</Card.Footer>
			</Card>
		</Container>
	);
}
