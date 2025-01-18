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
        const { nome, descrizione, aula, numPosti, length, availability  } = formData;
        

        if (!nome || !descrizione || !aula || !numPosti || !availability || !length) {
            return json({ success: false, message: 'All fields are required.' }, { status: 400 });
        }
        
        let schedule = [
            Array(6).fill(0),
            Array(6).fill(0),
            Array(6).fill(0),
            Array(6).fill(0),
            Array(6).fill(0),
            Array(6).fill(0)
        ];
        
        availability.forEach(day => {
            if (day === 1 || day === 4) {
                schedule[day] = Array(6).fill(numPosti);
            } else {
                schedule[day] = Array(4).fill(numPosti).concat(Array(2).fill(0));
            }
        });
        console.log(schedule);
        await db.insert(corsi).values({
            nome,
            descrizione,
            aula,   
            numPosti,
            docente: locals.user.id,
            length,
            postiDisponibili: numPosti, 
            availability, 
            schedule: schedule
        });

        
        return json({ success: true, message: 'Course registered successfully!' });
    } catch (error) {
        console.error('Error:', error);
        return json({ success: false, message: 'Something went wrong ' }, { status: 500 });
    }
};

export const PUT = async ({ locals, request }) => {
    if (!locals.user || locals.user.role !== 'docente') {
        return json({ success: false, message: 'Unauthorized.' }, { status: 401 });
    }
    try {
        const { id, nome, descrizione, aula, numPosti, length, availability } = await request.json();
        if (!id || !nome || !descrizione || !aula || !numPosti || !length || !availability) {
            return json({ success: false, message: 'All fields are required.' }, { status: 400 });
        }
        await db.update(corsi)
            .set({ nome, descrizione, aula, numPosti, postiDisponibili: numPosti, length, availability })
            .where(eq(corsi.id, id));
        return json({ success: true });
    } catch (error) {
        return json({ success: false, message: 'Something went wrong' }, { status: 500 });
    }
};
