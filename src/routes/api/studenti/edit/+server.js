import { json } from '@sveltejs/kit';
import { db } from '$lib/db/db';
import { studenti } from '$lib/db/models';
import { eq } from 'drizzle-orm';

export const POST = async ({ locals, request }) => {
  try {
    if (!locals.user || locals.user.role !== 'studente') {
      return json({ success: false, message: 'Unauthorized.' }, { status: 401 });
    }

    const { nomeCompleto, classe, email } = await request.json();
    // Check if at least one field is being updated
    if (!nomeCompleto && !classe && !email) {
      return json({ success: false, message: 'No fields to update.' }, { status: 400 });
    }

    // Build update object with only provided fields
    const updateData = {};
    if (nomeCompleto) updateData.nomeCompleto = nomeCompleto;
    if (classe) updateData.classe = classe;
    if (email) updateData.email = email;

    await db
      .update(studenti)
      .set(updateData)
      .where(eq(studenti.id, locals.user.id));

    return json({ success: true, message: 'User edited.' });
  } catch (error) {
    console.error('Edit Error:', error);
    return json({ success: false, message: 'User not edited; error.' }, { status: 500 });
  }
};

