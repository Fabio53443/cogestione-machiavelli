import { redirect } from '@sveltejs/kit';
import { db } from '$lib/db/db.js';
import { eq } from 'drizzle-orm';
import { corsi, professori, studenti } from '$lib/db/models.js';
import { isAdmin } from '$lib/isAdmin';


export async function load({ locals }) {
  if (!(await isAdmin(locals))) {
    throw redirect(302, '/studente/dashboard');
  }

  return {
      pageName: 'Registrazione degli organizzatori', 
    };
  }