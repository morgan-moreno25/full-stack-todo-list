import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useTokenConfig } from '../utils';
import todoService from '../services/todo.service';

export const getAllTodos = createAsyncThunk('todo/getAll', async (_, thunkAPI) => {
	const config = useTokenConfig(thunkAPI.getState);

	try {
		const data = await todoService.getAllTodos(config);
		if (data.error) {
			throw data;
		}
		return {
			todos: data.todos,
		};
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
export const addTodo = createAsyncThunk(
	'todo/add',
	async ({ text, priority, dueDate, project }, thunkAPI) => {
		const body = JSON.stringify({ text, priority, dueDate, project });
		const config = useTokenConfig(thunkAPI.getState);

		try {
			const data = await todoService.addTodo(body, config);
			if (data.error) {
				throw data;
			}
			return {
				todo: data.todo,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const updateTodo = createAsyncThunk(
	'todo/update',
	async ({ id, todo: { text, priority, dueDate, project } }, thunkAPI) => {
		const body = JSON.stringify({ text, priority, dueDate, project });
		const config = useTokenConfig(thunkAPI.getState);

		try {
			const data = await todoService.updateTodo(id, body, config);
			if (data.error) {
				throw data;
			}
			return {
				id,
				updatedTodo: data.updatedTodo,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const deleteTodo = createAsyncThunk('todo/delete', async ({ id }, thunkAPI) => {
	const config = useTokenConfig(thunkAPI.getState);

	try {
		const data = await todoService.deleteTodo(id, config);
		if (data.error) {
			throw data;
		}
		return {
			id,
			message: data.message,
		};
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
export const toggleCompleted = createAsyncThunk('todo/toggleComplete', async ({ id }, thunkAPI) => {
	const body = {};
	const config = useTokenConfig(thunkAPI.getState);

	try {
		const data = await todoService.toggleCompleted(id, body, config);
		if (data.error) {
			throw data;
		}

		return {
			id,
			updatedTodo: data.updatedTodo,
		};
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

const todoSlice = createSlice({
	name: 'todo',
	initialState: {
		data: [],
		currentTodo: {},
		isLoading: false,
		error: null,
	},
	reducers: {
		setCurrentTodo: (state, { payload }) => {
			state.currentTodo = payload.todo;
		},
	},
	extraReducers: $ => {
		$.addCase(getAllTodos.pending, state => {
			state.isLoading = true;
		});
		$.addCase(addTodo.pending, state => {
			state.isLoading = true;
		});
		$.addCase(updateTodo.pending, state => {
			state.isLoading = true;
		});
		$.addCase(deleteTodo.pending, state => {
			state.isLoading = true;
		});
		$.addCase(toggleCompleted.pending, state => {
			state.isLoading = true;
		});
		$.addCase(getAllTodos.fulfilled, (state, { payload }) => {
			state.data = payload.todos;
			state.isLoading = false;
		});
		$.addCase(addTodo.fulfilled, (state, { payload }) => {
			state.data.push(payload.todo);
			state.isLoading = false;
		});
		$.addCase(updateTodo.fulfilled, (state, { payload }) => {
			const index = state.data.findIndex(todo => todo.id === payload.id);
			if (index !== -1) {
				state.data.splice(index, 1, payload.updatedTodo);
			}
			state.isLoading = false;
		});
		$.addCase(deleteTodo.fulfilled, (state, { payload }) => {
			state.data = state.data.filter(todo => todo.id !== payload.id);
			state.isLoading = false;
		});
		$.addCase(toggleCompleted.fulfilled, (state, { payload }) => {
			const index = state.data.findIndex(todo => todo.id === payload.id);
			if (index !== -1) {
				state.data.splice(index, 1, payload.updatedTodo);
			}
			state.isLoading = false;
		});
		$.addCase(getAllTodos.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		$.addCase(addTodo.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		$.addCase(updateTodo.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		$.addCase(deleteTodo.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		$.addCase(toggleCompleted.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
	},
});

export const { setCurrentTodo } = todoSlice.actions;

export default todoSlice.reducer;
