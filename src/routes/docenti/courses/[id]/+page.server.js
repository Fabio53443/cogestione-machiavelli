import { db } from '$lib/db/db.js';
import { corsi } from '$lib/db/models.js';
import { eq } from 'drizzle-orm';

export async function load({ params, locals }) {
  const courseId = parseInt(params.id, 10);

  if (!locals.user) {
    return { corso: null, error: 'Utente non autenticato' };
  }

  // Load the specific course by ID, ensuring it belongs to the logged-in teacher
  const [course] = await db
    .select()
    .from(corsi)
    .where(eq(corsi.id, courseId))
    .where(eq(corsi.docente, locals.user.id));

  if (!course) {
    return { corso: null, error: 'Corso non trovato o non sei autorizzato a visualizzarlo' };
  }

  return {
    corso: {
      id: course.id,
      nome: course.nome,
      descrizione: course.descrizione,
      aula: course.aula,
      postiDisponibili: course.postiDisponibili,
      numPosti: course.numPosti
    }
  };
}