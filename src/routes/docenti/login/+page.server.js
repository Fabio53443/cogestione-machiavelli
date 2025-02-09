import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
  if (!locals.user || locals.user.role !== 'docente') {
    throw redirect(302, '/');
  }

    return {
      pageName: 'Login docenti', 
    };
  }