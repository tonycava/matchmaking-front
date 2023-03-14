import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		watch: {
			usePolling: true,
		},
		host: true, // needed for the DC port mapping to work
		strictPort: true,
		port: +(process.env.PORT ?? '3000'),
	},
	resolve: {
		alias: {
			'@components': path.resolve('./src/components'),
			'@services': path.resolve('./src/services'),
		}
	}
});
