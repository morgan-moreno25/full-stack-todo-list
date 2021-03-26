import { useSelector, useDispatch } from 'react-redux';
import { setCurrentProject } from '../../redux/slices/project.slice';

import { Nav, Navbar, NavbarBrand, Dropdown } from 'react-bootstrap';
import AddProjectModal from '../content/modals/AddProjectModal';
import AddTodoModal from '../content/modals/AddTodoModal';
import Logout from '../common/Logout';

export default function Sidenav() {
	const dispatch = useDispatch();

	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const projects = useSelector(state => state.project.data);
	const currentProject = useSelector(state => state.project.currentProject);

	return (
		<Navbar collapseOnSelect expand='md' variant='dark' bg='dark' id='nav' className='row'>
			{isAuthenticated ? (
				<>
					<NavbarBrand>Todo List</NavbarBrand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav id='nav-buttons' className='ml-auto'>
							<Dropdown>
								<Dropdown.Toggle variant='primary' id='projects-dropdown-btn'>
									Projects
								</Dropdown.Toggle>
								<Dropdown.Menu>
									{projects.map(project => (
										<Dropdown.Item
											key={project.id}
											className={`${project === currentProject ? 'active' : ''}`}
											onClick={() => dispatch(setCurrentProject({ project }))}>
											{project.title}
										</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
							<div>
								<Logout />
							</div>
						</Nav>
					</Navbar.Collapse>
				</>
			) : (
				<p>Welcome to Todo List</p>
			)}
		</Navbar>
	);
}
