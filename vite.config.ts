import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

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
});
