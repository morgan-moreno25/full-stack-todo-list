import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './slices/alert.slice';
import authReducer from './slices/auth.slice';
import projectReducer from './slices/project.slice';
import todoReducer from './slices/todo.slice';

export default configureStore({
	reducer: {
		alert: alertReducer,
		auth: authReducer,
		project: projectReducer,
		todo: todoReducer,
	},
});
