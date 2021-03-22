import { useSelector, useDispatch } from 'react-redux';
import { setCurrentProject } from '../../redux/slices/project.slice';

import { Navbar, Button } from 'react-bootstrap';
import AddProjectModal from '../content/AddProjectModal';

export default function Sidenav() {
	const dispatch = useDispatch();

	const projects = useSelector(state => state.project.data);
	const currentProject = useSelector(state => state.project.currentProject);

	return (
		<Navbar variant='light' id='nav'>
			<ul>
				{projects.map(project => (
					<li
						className={`${project === currentProject ? 'active' : ''} project`}
						key={project.id}
						onClick={() => dispatch(setCurrentProject({ project }))}>
						{project.title}
					</li>
				))}
			</ul>
			<AddProjectModal />
		</Navbar>
	);
}
