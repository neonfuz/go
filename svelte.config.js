import netlify from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: netlify(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			rollupInputOptions: {
				allowNodeBuiltins: ['pouchdb-browser', 'pouchdb-utils']
			}
		}
	}
};

export default config;
