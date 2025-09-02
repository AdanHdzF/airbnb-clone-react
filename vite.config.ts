import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	server: {
		port: 5173,
		watch: {
			usePolling: true,
		},
	},
	plugins: [
		react(),
		federation({
			name: 'airbnb-shell',
			remotes: {
				propertyService: 'http://localhost:3001/assets/remoteEntry.js',
				searchService: 'http://localhost:3002/assets/remoteEntry.js',
			},
			shared: ['react', 'react-dom', 'react-router-dom'],
		}),
	],
	build: {
		target: 'esnext',
		minify: false,
		// cssMinify: false,
		cssCodeSplit: false,
	},
});
