import adapter from '@sveltejs/adapter-node';

export default {
	kit: {
		adapter: adapter({
			// See below for an explanation of these options
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			},
			platformProxy: {
				environment: undefined,
				experimentalJsonConfig: false,
				persist: false
			}
		})
	}
};
