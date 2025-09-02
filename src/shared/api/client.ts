import axios from 'axios';
import axiosRetry from 'axios-retry';

import Logger from '../lib/logger';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = 'https://5918b52ac4ca.ngrok-free.app';

const myLogger = new Logger();

export const apiClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		'ngrok-skip-browser-warning': 'true',
	},
});

axiosRetry(apiClient, {
	retries: 3,
	retryDelay: axiosRetry.exponentialDelay,
	retryCondition: (error) => {
		return error.response?.status === 500;
	},
});

apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// alert(error);

		myLogger.info(error);
		return Promise.reject(error);
	}
);

apiClient.interceptors.request.use((config) => {
	console.log(config);
	myLogger.info(config.url ?? 'No URL');
	return config;
});

apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('access_token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// apiClient.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	(error) => {
// 		if (error.response?.status === 401) {
// 			localStorage.removeItem('access_token');
// 			// refresToken(); //custom refresh token logic
// 			window.location.href = '/';
// 		}

// 		return Promise.reject(error);
// 	}
// );
