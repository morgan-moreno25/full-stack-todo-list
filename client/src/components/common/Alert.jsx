import { useDispatch, useSelector } from 'react-redux';
import { clearAlert } from '../../redux/slices/alert.slice';

import { Alert } from 'react-bootstrap';

export default function CustomAlert() {
	const dispatch = useDispatch();

	const { message, type } = useSelector(state => state.alert);

	const handleClose = () => {
		dispatch(clearAlert());
	};

	if (message) {
		return (
			<Alert
				variant={type}
				show={message ? true : false}
				onClose={handleClose}
				dismissible
				id='alert'>
				<p>{message}</p>
			</Alert>
		);
	} else {
		return null;
	}
}
