import { useSelector, useDispatch } from 'react-redux';
import { setCurrentProject } from '../../redux/slices/project.slice';

import { Navbar } from 'react-bootstrap';
import AddProjectModal from '../content/modals/AddProjectModal';
import AddTodoModal from '../content/modals/AddTodoModal';

export default function Sidenav() {
	const dispatch = useDispatch();

	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const projects = useSelector(state => state.project.data);
	const currentProject = useSelector(state => state.project.currentProject);

	return (
		<Navbar variant='light' id='nav'>
			{isAuthenticated ? (
				<>
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
					<div id='add-buttons'>
						<AddProjectModal />
						<AddTodoModal />
					</div>
				</>
			) : (
				<p>Login to view this feature</p>
			)}
		</Navbar>
	);
}
