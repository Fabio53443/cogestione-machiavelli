
import { redirect } from '@sveltejs/kit';
export function load({ locals }) {

  if (!locals.user) {
    throw redirect(302, '/login');
  }
  return {
    pageName: 'Dashboard studente',
    user: locals.user
  };
}