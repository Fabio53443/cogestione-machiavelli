import { db } from "$lib/db/db.js";
import { corsi } from "$lib/db/models.js";
import { eq } from "drizzle-orm";
import { isAdmin } from "$lib/isAdmin";
import { redirect } from '@sveltejs/kit';


export async function load({ params, locals }) {
  const courseId = parseInt(params.id, 10);
  if (!(await isAdmin(locals))) {
    throw redirect(302, '/studente/dashboard');
}   
  // Load the specific course by ID, ensuring it belongs to the logged-in teacher
  const [course] = await db.select().from(corsi).where(eq(corsi.id, courseId));

  return {
    pageName: "Dettagli del corso",
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
    days: ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
  };
}
