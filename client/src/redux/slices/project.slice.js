import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useTokenConfig } from '../utils';
import projectService from '../services/project.service';

export const getAllProjects = createAsyncThunk('project/getAll', async (_, thunkAPI) => {
	const config = useTokenConfig(thunkAPI.getState);

	try {
		const data = await projectService.getAllProjects(config);
		if (data.error) {
			throw data;
		}
		return {
			projects: data.projects,
		};
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
export const addProject = createAsyncThunk(
	'project/add',
	async ({ title, description }, thunkAPI) => {
		const body = await JSON.stringify({ title, description });
		const config = await useTokenConfig(thunkAPI.getState);

		try {
			const data = await projectService.addProject(body, config);
			if (data.error) {
				throw data;
			}
			return {
				project: data.project,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const updateProject = createAsyncThunk(
	'project/update',
	async ({ id, project: { title, description } }, thunkAPI) => {
		const body = JSON.stringify({ title, description });
		const config = useTokenConfig(thunkAPI.getState);

		try {
			const data = await projectService.updateProject(id, body, config);
			if (data.error) {
				throw data;
			}
			return {
				id: id,
				updatedProject: data.updatedProject,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const deleteProject = createAsyncThunk('project/delete', async ({ id }, thunkAPI) => {
	const config = useTokenConfig(thunkAPI.getState);

	try {
		const data = await projectService.deleteProject(id, config);
		if (data.error) {
			throw data;
		}
		return {
			id: id,
			message: data.message,
		};
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

const projectSlice = createSlice({
	name: 'project',
	initialState: {
		data: [],
		currentProject: {},
		isLoading: false,
		error: null,
	},
	reducers: {
		setCurrentProject: (state, { payload }) => {
			state.currentProject = payload.project;
		},
	},
	extraReducers: builder => {
		builder.addCase(getAllProjects.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(addProject.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(updateProject.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(deleteProject.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(getAllProjects.fulfilled, (state, { payload }) => {
			state.data = payload.projects;
			state.currentProject = payload.projects[0];
			state.isLoading = false;
		});
		builder.addCase(addProject.fulfilled, (state, { payload }) => {
			state.data.push(payload.project);
			state.currentProject = payload.project;
			state.isLoading = false;
		});
		builder.addCase(updateProject.fulfilled, (state, { payload }) => {
			const index = state.data.findIndex(project => project.id === payload.id);
			if (index !== -1) {
				state.data.splice(index, 1, payload.updatedProject);
			}
			state.isLoading = false;
		});
		builder.addCase(deleteProject.fulfilled, (state, { payload }) => {
			state.data = state.data.filter(project => project.id !== payload.id);
			state.isLoading = false;
			state.currentProject = state.data[0];
		});
		builder.addCase(getAllProjects.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(addProject.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(updateProject.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(deleteProject.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
	},
});

export const { setCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;
