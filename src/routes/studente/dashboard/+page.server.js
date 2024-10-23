import { redirect } from '@sveltejs/kit';
import { db } from '$lib/db/db.js';
import { eq } from 'drizzle-orm';
import { corsi, iscrizioni, professori } from '$lib/db/models.js';

export async function load({ locals }) {
  if (!locals.user) {
    throw redirect(302, '/login');
  }

  try {
    // Get all courses the student is enrolled in
    const userIscrizioni = await db
      .select({
        corso: corsi,
        docente: professori
      })
      .from(iscrizioni)
      .where(eq(iscrizioni.idStudente, locals.user.id))
      .leftJoin(corsi, eq(iscrizioni.idCorso, corsi.id))
      .leftJoin(professori, eq(corsi.docente, professori.id));

    const corsiIscritto = userIscrizioni.map(({ corso, docente }) => ({
      id: corso.id,
      nome: corso.nome,
      descrizione: corso.descrizione,
      aula: corso.aula,
      numPosti: corso.numPosti,
      ora: corso.ora,
      giorno: corso.giorno,
      docenteNome: `${docente.nome} ${docente.cognome}`
    }));

    return {
      pageName: 'Dashboard studente',
      user: locals.user,
      corsi: corsiIscritto
    };
  } catch (error) {
    console.error('Error fetching courses:', error);
    // You might want to throw a proper error here that your client can handle
    return {
      pageName: 'Dashboard studente',
      user: locals.user,
      corsi: [],
      error: 'Si è verificato un errore durante il caricamento dei corsi.'
    };
  }
}