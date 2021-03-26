import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/auth.slice';

import { Button } from 'react-bootstrap';

export default function Logout() {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(logout());
	};

	return (
		<Button variant='danger' id='logout-btn' onClick={handleClick}>
			Logout
		</Button>
	);
}
