import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import { useConfig, useTokenConfig } from '../utils';

export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
	const body = JSON.stringify({ username, password });
	const config = useConfig();

	try {
		const data = await authService.login(body, config);
		if (data.error) {
			throw data;
		}

		return {
			token: data.token,
			user: data.user,
		};
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
export const register = createAsyncThunk(
	'auth/register',
	async ({ username, password }, thunkAPI) => {
		const body = JSON.stringify({ username, password });
		const config = useConfig();

		try {
			const data = await authService.register(body, config);
			if (data.error) {
				throw data;
			}
			return {
				token: data.token,
				user: data.user,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const loadUser = createAsyncThunk('auth/loadUser', async (_, thunkAPI) => {
	const config = useTokenConfig(thunkAPI.getState);

	try {
		const data = await authService.loadUser(config);
		if (data.error) {
			throw data;
		}
		return {
			user: data.user,
		};
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: '',
		user: {},
		isAuthenticated: false,
		isLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(login.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(register.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(loadUser.pending, state => {
			state.isLoading = true;
			state.isAuthenticated = false;
			state.user = {};
		});
		builder.addCase(login.fulfilled, (state, { payload }) => {
			state.token = payload.token;
			state.user = payload.user;
			state.isAuthenticated = true;
			state.isLoading = false;
		});
		builder.addCase(register.fulfilled, (state, { payload }) => {
			state.token = payload.token;
			state.user = payload.user;
			state.isAuthenticated = true;
			state.isLoading = false;
		});
		builder.addCase(loadUser.fulfilled, (state, { payload }) => {
			state.user = payload.user;
			state.isAuthenticated = true;
			state.isLoading = false;
		});
		builder.addCase(login.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(register.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(loadUser.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.token = '';
			state.error = payload;
		});
	},
});

export default authSlice.reducer;
