import { redirect } from '@sveltejs/kit';
import { isAdmin } from '$lib/isAdmin';
export function load({ locals }) {

  if (!locals.user || locals.user.role !== 'docente' && !isAdmin(locals.user)) {
    throw redirect(302, '/');
  }
    return {
      pageName: 'Nuovo corso', 
    };
  }