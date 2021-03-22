import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './slices/alert.slice';
import authReducer from './slices/auth.slice';

export default configureStore({
	reducer: {
		alert: alertReducer,
		auth: authReducer,
	},
});
