import React from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import AuthForm from './components/auth/AuthForm';
import Sidenav from './components/layout/Sidenav';
import Header from './components/layout/Header';
import Alert from './components/common/Alert';
import Content from './components/content';

export default function App() {
	const { isAuthenticated } = useSelector(state => state.auth);

	return (
		<div id='app'>
			<Alert />
			<Sidenav />
			<Header />
			<main id='content'>{isAuthenticated ? <Content /> : <AuthForm />}</main>
		</div>
	);
}
