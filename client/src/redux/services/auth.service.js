import axios from 'axios';

const AuthService = (() => {
	const url = '/api/auth';

	const login = async (body, config) => {
		try {
			const response = await axios.post(`${url}/login`, body, config);
			return response.data;
		} catch (error) {
			return error.response.data;
		}
	};
	const register = async (body, config) => {
		try {
			const response = await axios.post(`${url}/register`, body, config);
			return response.data;
		} catch (error) {
			return error.response.data;
		}
	};
	const loadUser = async config => {
		try {
			const response = await axios.get(`${url}/user`, config);
			return response.data;
		} catch (error) {
			return error.response.data;
		}
	};

	return {
		loadUser,
		login,
		register,
	};
})();

export default AuthService;
