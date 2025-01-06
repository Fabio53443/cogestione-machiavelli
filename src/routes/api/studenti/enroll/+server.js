import { json } from '@sveltejs/kit';
import { db } from '$lib/db/db';
import { iscrizioni, corsi } from '$lib/db/models';
import { eq, and } from 'drizzle-orm';

export const POST = async ({ locals, request }) => {
  try {
    if (!locals.user || locals.user.role !== 'studente') {
      return json({ success: false, message: 'Unauthorized.' }, { status: 401 });
    }
    const { idCorso, giorno, ora } = await request.json();

    if (!idCorso || giorno === undefined || ora === undefined) {
      return json({ success: false, message: 'Missing enrollment data.' }, { status: 400 });
    }

    // Fetch course details
    const course = await db.select().from(corsi).where(eq(corsi.id, idCorso)).limit(1);

    if (course.length === 0) {
      return json({ success: false, message: 'Course not found.' }, { status: 404 });
    }

    const courseLength = course[0].length;

    // Check for overlapping courses
    for (let i = 0; i < courseLength; i++) {
      const conflictingEnrollment = await db.select().from(iscrizioni).where(
        and(
          eq(iscrizioni.idStudente, locals.user.id),
          eq(iscrizioni.giorno, giorno),
          eq(iscrizioni.ora, ora + i)
        )
      ).limit(1);

      if (conflictingEnrollment.length > 0) {
        return json({ success: false, message: 'Already enrolled in another course at the specified time.' }, { status: 400 });
      }

      // Check availability in the course schedule
      if (course[0].schedule[giorno][ora + i] <= 0) {
        return json({ success: false, message: 'No available slots for the selected time.' }, { status: 400 });
      }
    }

    // Proceed with enrollment
    for (let i = 0; i < courseLength; i++) {
      await db.insert(iscrizioni).values({
        idStudente: locals.user.id,
        idCorso,
        giorno,
        ora: ora + i
      });

      // Update the course schedule to decrement the available slots
      course[0].schedule[giorno][ora + i] -= 1;
    }
    await db.update(corsi).set({ schedule: course[0].schedule }).where(eq(corsi.id, idCorso));

    return json({ success: true, message: 'Enrollment successful.' });
  } catch (error) {
    console.error('Enrollment Error:', error);
    return json({ success: false, message: 'Enrollment failed.' }, { status: 500 });
  }
};