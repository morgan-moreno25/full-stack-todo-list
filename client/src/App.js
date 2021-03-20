import React from 'react';

import { Navbar, Button, Container } from 'react-bootstrap';

import './App.scss';

export default function App() {
	return (
		<div id='app'>
			<Navbar variant='light' id='nav'></Navbar>
			<Container as='header' id='header'>
				<div id='header-title'>
					<h3>Todo App</h3>
				</div>
				<div id='header-buttons'>
					<Button variant='primary'>Login</Button>
					<Button variant='secondary'>Register</Button>
				</div>
			</Container>
			<main id='content'></main>
		</div>
	);
}
