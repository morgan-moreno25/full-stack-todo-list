import React from 'react';

import { Button, Container } from 'react-bootstrap';

import './App.scss';
import AuthForm from './components/auth/AuthForm';
import Sidenav from './components/layout/Sidenav';
import Header from './components/layout/Header';

export default function App() {
	return (
		<div id='app'>
			<Sidenav />
			<Header />
			<main id='content'>
				<AuthForm />
			</main>
		</div>
	);
}
