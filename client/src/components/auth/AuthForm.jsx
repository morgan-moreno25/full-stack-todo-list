import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, register } from '../../redux/slices/auth.slice';
import { updateAlert, clearAlert } from '../../redux/slices/alert.slice';

import { Container, Form, Button } from 'react-bootstrap';

export default function AuthForm() {
	const dispatch = useDispatch();

	const { isAuthenticated } = useSelector(state => state.auth);

	const [formType, setFormType] = useState('login');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const toggleFormType = () =>
		formType === 'login' ? setFormType('register') : setFormType('login');

	const handleSubmit = async e => {
		e.preventDefault();

		let result;

		if (formType === 'login') {
			result = await dispatch(login({ username, password }));
		}
		if (formType === 'register') {
			result = await dispatch(register({ username, password }));
		}

		if (login.fulfilled.match(result) || register.fulfilled.match(result)) {
			const { user } = result.payload;

			// Dispatch action to set a welcome alert for ${username}
			dispatch(updateAlert({ type: 'success', message: `Welcome back ${user.username}` }));
			setTimeout(() => {
				dispatch(clearAlert());
			}, 10000);
		} else {
			const { error, message } = result.payload;

			// Dispatch action to set an error alert
			dispatch(updateAlert({ type: 'danger', message: `${error}: ${message}` }));
			setTimeout(() => {
				dispatch(clearAlert());
			}, 10000);
		}
	};

	return (
		<Container id='auth'>
			<h2>{formType === 'login' ? 'Login' : 'Register'}</h2>
			<Form>
				<Form.Group>
					<Form.Label>Username</Form.Label>
					<Form.Control
						type='text'
						id='username'
						name='username'
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						id='password'
						name='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button variant='secondary' onClick={toggleFormType}>
					{formType === 'login' ? 'New User? Register Here' : 'Already have an account? Login Here'}
				</Button>
				<Button variant='primary' onClick={handleSubmit}>
					Submit
				</Button>
			</Form>
		</Container>
	);
}
