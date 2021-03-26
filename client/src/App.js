import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProjects } from './redux/slices/project.slice';
import { getAllTodos } from './redux/slices/todo.slice';

import './App.scss';
import AuthForm from './components/auth/AuthForm';
import Alert from './components/common/Alert';
import Content from './components/content';
import Logout from './components/common/Logout';
import Nav from './components/layout/Nav';

import { Container } from 'react-bootstrap';

export default function App() {
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector(state => state.auth);

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(getAllProjects());
			dispatch(getAllTodos());
		}
	}, [isAuthenticated, dispatch]);
	return (
		<Container id='app' fluid>
			<Alert />
			<Nav />
			<Container as='main' fluid>
				{isAuthenticated ? <Content /> : <AuthForm />}
			</Container>
		</Container>
	);
}
