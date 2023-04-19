import { defineConfig } from 'cypress';
import * as fs from "fs";
export default defineConfig({
	projectId: '9mzfyx',
	responseTimeout: 120e3,
	e2e: {
		setupNodeEvents(on, config) {
			on(
				'after:spec',
				(spec: Cypress.Spec, results: CypressCommandLine.RunResult) => {
					if (results && results.video) {
						// Do we have failures for any retry attempts?
						const failures = results.tests.some((test) =>
							test.attempts.some((attempt) => attempt.state === 'failed')
						)
						if (!failures) {
							// delete the video if the spec passed and no tests retried
							fs.unlinkSync(results.video)
						}
					}
				}
			)
			config.env.test =
				process.env.NODE_ENV === 'test';
			return config;
		},
        baseUrl: 'http://localhost:8089',
	}
});