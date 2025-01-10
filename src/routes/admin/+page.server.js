import { redirect } from '@sveltejs/kit';
import { db } from '$lib/db/db';
import { studenti } from '$lib/db/models';
import { eq } from 'drizzle-orm';

export const load = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    const user = await db.select({
        admin: studenti.admin
    }).from(studenti).where(eq(studenti.id, locals.user.id));

    if (!user[0].admin ) {
        throw redirect(302, '/studente/dashboard');
    }

    return {
        pageName: 'Amministratori',
        user: locals.user
    };
};
