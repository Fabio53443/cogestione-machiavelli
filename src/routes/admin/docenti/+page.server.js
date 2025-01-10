import { redirect } from '@sveltejs/kit';
import { db } from '$lib/db/db';
import { studenti } from '$lib/db/models';
import { eq } from 'drizzle-orm';

export const load = async ({ locals }) => {
    throw redirect(302, '/admin');
};
