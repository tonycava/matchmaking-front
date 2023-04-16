import { defineConfig } from 'cypress';

export default defineConfig({
	projectId: '9mzfyx',
	responseTimeout: 120e3,
	env: {
		PORT: 8089
	},
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		}
	}
});
