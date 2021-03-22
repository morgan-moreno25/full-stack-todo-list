import { Container, Button } from 'react-bootstrap';

export default function Header() {
	return (
		<Container as='header' id='header'>
			<div id='header-title'>
				<h3>Todo App</h3>
			</div>
		</Container>
	);
}
