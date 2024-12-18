import { json } from '@sveltejs/kit';
import { db } from '$lib/db/db';
import { corsi } from '$lib/db/models';
import { eq } from 'drizzle-orm';
import { SignJWT } from 'jose';
import { TextEncoder } from 'util';
import bcrypt from 'bcrypt';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const POST = async ({ locals, request }) => {
    if (!locals.user || locals.user.role !== 'docente') {
        return json({ success: false, message: 'Unauthorized.' }, { status: 401 });
    }
    try {
        const formData = await request.json();
        const { nome, descrizione, aula, numPosti, ora, giorno, length } = formData;

        if (!nome || !descrizione || !aula || !numPosti || !ora || !giorno || !length) {
            return json({ success: false, message: 'All fields are required.' }, { status: 400 });
        }

        await db.insert(corsi).values({
            nome,
            descrizione,
            aula,
            numPosti,
            ora,
            giorno,
            docente: locals.user.id,
            length,
            postiDisponibili: numPosti
        });
        return json({ success: true, message: 'Course registered successfully!' });
    } catch (error) {
        console.error('Error:', error);
        return json({ success: false, message: 'Shit failed' }, { status: 500 });
    }
};