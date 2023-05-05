import { defineConfig } from 'cypress';
export default defineConfig({
	projectId: '9mzfyx',
	responseTimeout: 120e3,
	e2e: {
		setupNodeEvents(on, config) {
			config.env.test = process.env.NODE_ENV === 'test';
			return config;
		},
		baseUrl: 'http://localhost:8089' //8089 or 11001
	}
});
