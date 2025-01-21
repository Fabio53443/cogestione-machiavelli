import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

export default {
  kit: {
    adapter: adapter(),
  },

};
