import axios from 'axios';

const ProjectService = (() => {
	const url = '/api/projects';

	const getAllProjects = async config => {
		try {
			const response = await axios.get(url, config);
			return response.data;
		} catch (error) {
			return error.response.data;
		}
	};
	const addProject = async (body, config) => {
		try {
			const response = await axios.post(url, body, config);
			return response.data;
		} catch (error) {
			return error.response.data;
		}
	};
	const updateProject = async (id, body, config) => {
		try {
			const response = await axios.put(`${url}/${id}`, body, config);
			return response.data;
		} catch (error) {
			return error.response.data;
		}
	};
	const deleteProject = async (id, config) => {
		try {
			const response = await axios.delete(`${url}/${id}`, config);
			return response.data;
		} catch (error) {
			return error.response.data;
		}
	};

	return {
		addProject,
		deleteProject,
		getAllProjects,
		updateProject,
	};
})();

export default ProjectService;
