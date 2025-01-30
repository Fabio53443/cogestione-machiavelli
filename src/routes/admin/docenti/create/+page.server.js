import { redirect } from '@sveltejs/kit';
import { db } from '$lib/db/db.js';
import { eq } from 'drizzle-orm';
import { corsi, professori, studenti } from '$lib/db/models.js';


export async function load({ locals }) {
  if (!locals.user) {
    throw redirect(302, "/login");
  }

  const user = await db
    .select({
      admin: studenti.admin,
    })
    .from(studenti)
    .where(eq(studenti.id, locals.user.id));

  if (!user[0].admin) {
    throw redirect(302, "/studente/dashboard");
  }
    return {
      pageName: 'Registrazione degli organizzatori', 
    };
  }