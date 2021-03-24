import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProjects } from './redux/slices/project.slice';
import { getAllTodos } from './redux/slices/todo.slice';

import './App.scss';
import AuthForm from './components/auth/AuthForm';
import Sidenav from './components/layout/Sidenav';
import Alert from './components/common/Alert';
import Content from './components/content';

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
		<div id='app'>
			<Alert />
			<Sidenav />
			<main id='content'>{isAuthenticated ? <Content /> : <AuthForm />}</main>
		</div>
	);
}
