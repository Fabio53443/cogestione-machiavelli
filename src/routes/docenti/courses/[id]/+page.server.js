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
    .where(eq(corsi.id, courseId)); 

  if (!course || course.docente !== locals.user.id) {
    return { corso: null, error: 'Corso non trovato o non sei autorizzato a visualizzarlo' };
  }

  return {
    pageName: 'Dettagli del corso', 
    corso: {
      id: course.id,
      nome: course.nome,
      descrizione: course.descrizione,
      length: course.length,
      aula: course.aula,
      postiDisponibili: course.postiDisponibili,
      numPosti: course.numPosti, 
      schedule: course.schedule,
      availability: course.availability,
    }, 
    days: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
  };
}