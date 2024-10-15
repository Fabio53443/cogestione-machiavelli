import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

export default {
  kit: {
    adapter: adapter(),
  },
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};
