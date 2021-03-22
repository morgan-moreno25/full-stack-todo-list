import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
	name: 'alert',
	initialState: {
		message: '',
		type: '',
	},
	reducers: {
		updateAlert: (state, { payload }) => {
			state.message = payload.message;
			state.type = payload.type;
		},
		clearAlert: state => {
			state.error = '';
			state.message = '';
			state.type = '';
		},
	},
});

export const { updateAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
