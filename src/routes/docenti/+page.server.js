import { redirect } from '@sveltejs/kit';

export function load( { locals }) {
  if (locals.user) {
    return redirect(302, '/docenti/dashboard');
      }
    return {
      pageName: 'Portale Docenti', 
    };
  }