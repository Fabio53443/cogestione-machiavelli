import { redirect } from '@sveltejs/kit';
import { db } from '$lib/db/db.js';
import { eq } from 'drizzle-orm';
import { studenti } from '$lib/db/models.js';

export async function load({ locals }) {
  if (!locals.user) {
    throw redirect(302, '/login');
  }

  try {
    const user = await db.select().from(studenti).where(eq(studenti.id, locals.user.id));
    
    
    return {
      pageName: 'Il tuo profilo',
      user: locals.user,
        nomeCompleto: user[0].nomeCompleto,
        classe: user[0].classe,
        email: user[0].email,
    };
  } catch (error) {
    console.error('Error fetching courses:', error);
    // You might want to throw a proper error here that your client can handle
    return {
      pageName: 'Il tuo profilo',
      user: locals.user,
      corsi: [],
      error: 'Si è verificato un errore durante il caricamento dei corsi.'
    };
  }
}