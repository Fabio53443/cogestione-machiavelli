import { redirect } from '@sveltejs/kit';

export function load( { locals }) {
  if (locals.user && locals.user.role == 'docente') {
    return redirect(302, '/docenti/dashboard');
      }
    return {
      pageName: 'Portale Organizzatori', 
    };
  }