export const useConfig = () => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	return config;
};

export const useTokenConfig = getState => {
	const config = useConfig();

	const token = getState().auth.token;

	if (token) {
		config.headers['Authorization'] = token;
	}

	return config;
};
