import { redirect } from '@sveltejs/kit';


export function load({ locals }) {
  if (locals.user && locals.user.role === 'studente') {
    throw redirect(302, '/studente/dashboard/');
  }
  return {
    pageName: 'Login dello studente',
  };
}