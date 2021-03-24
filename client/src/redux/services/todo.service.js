import axios from 'axios';

const TodoService = (() => {
	const url = '/api/todos';

	const getAllTodos = async config => {
		try {
			const response = await axios.get(url, config);
			return response.data;
		} catch (error) {
			return error.response.data;
		}
	};
	const addTodo = async (body, config) => {
		try {
			const response = await axios.post(url, body, config);
			return response.data;
		} catch (error) {
			return error.response.data;
		}
	};
	const updateTodo = async (id, body, config) => {
		try {
			const response = await axios.put(`${url}/${id}`, body, config);
			return response.data;
		} catch (error) {
			return error.response.data;
		}
	};
	const deleteTodo = async (id, config) => {
		try {
			const response = await axios.delete(`${url}/${id}`, config);
			return response.data;
		} catch (error) {
			return error.response.data;
		}
	};
	const toggleCompleted = async (id, body, config) => {
		try {
			const response = await axios.post(`${url}/toggleCompleted/${id}`, body, config);
			return response.data;
		} catch (error) {
			return error.response.data;
		}
	};

	return {
		addTodo,
		deleteTodo,
		getAllTodos,
		toggleCompleted,
		updateTodo,
	};
})();

export default TodoService;
