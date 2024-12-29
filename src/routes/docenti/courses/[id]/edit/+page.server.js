import { db } from '$lib/db/db';
import { corsi } from '$lib/db/models';
import { eq } from 'drizzle-orm';

export async function load({ params, locals }) {
  const courseId = parseInt(params.id, 10);
  if (!locals.user) {
    return { corso: null, error: 'Utente non autenticato' };
  }

  const [course] = await db
    .select()
    .from(corsi)
    .where(eq(corsi.id, courseId));

  if (!course || course.docente !== locals.user.id) {
    return { corso: null, error: 'Corso non trovato o non sei autorizzato a visualizzarlo' };
  }

  return {
    corso: {
      id: course.id,
      nome: course.nome,
      descrizione: course.descrizione,
      aula: course.aula,
      postiDisponibili: course.postiDisponibili,
      numPosti: course.numPosti,
      length: course.length,
      availability: course.availability,
    }
  };
}