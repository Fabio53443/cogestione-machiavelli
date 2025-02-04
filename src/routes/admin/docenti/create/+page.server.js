import { redirect } from '@sveltejs/kit';
import { isAdmin } from '$lib/isAdmin';


export async function load({ locals }) {
  if (!(await isAdmin(locals))) {
    throw redirect(302, '/studente/dashboard');
  }

  return {
      pageName: 'Registrazione degli organizzatori', 
    };
  }