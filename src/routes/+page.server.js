import { redirect } from '@sveltejs/kit';

export function load( { locals }) {
  if (locals.user && locals.user.role == 'docente') {
    return redirect(302, '/docenti/dashboard');
      }
  if (locals.user && locals.user.role == 'studente') {
    return redirect(302, '/studente/dashboard');
      }

    return {
      pageName: 'Autogestione', 
    };
  }