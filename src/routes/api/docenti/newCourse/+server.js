import { json } from '@sveltejs/kit';
import { db } from '$lib/db/db';
import { corsi, iscrizioni, studenti } from '$lib/db/models';
import { eq } from 'drizzle-orm';
import { SignJWT } from 'jose';
import { TextEncoder } from 'util';
import bcrypt from 'bcrypt';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const POST = async ({ locals, request }) => {
    if (!locals.user) {
        return json({ success: false, message: "Unauthorized" }, { status: 401 });
      }
    
    const user = await db
        .select({
          admin: studenti.admin,
        })
        .from(studenti)
        .where(eq(studenti.id, locals.user.id));

    console.log(user);

    
    const isAdmin = true; 
    if (locals.user.role !== 'docente' && !isAdmin) {
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

export const DELETE = async ({ locals, request }) => {
    if (!locals.user) {
        return json({ success: false, message: "Unauthorized" }, { status: 401 });
      }
    
    const user = await db
        .select({
          admin: studenti.admin,
        })
        .from(studenti)
        .where(eq(studenti.id, locals.user.id));

    console.log(user);
    const isAdmin = user[0].admin;
    if (locals.user.role !== 'docente' || !isAdmin) {
        return json({ success: false, message: 'Unauthorized.' }, { status: 401 });
    }

    try {
        const { id } = await request.json();
        
        // Verify the course exists and belongs to the teacher
        const corso = await db.select().from(corsi).where(eq(corsi.id, id));
        if (!corso.length || corso[0].docente !== locals.user.id) {
            return json({ success: false, message: 'Course not found or unauthorized' }, { status: 404 });
        }

        // Delete all related registrations first
        await db.delete(iscrizioni).where(eq(iscrizioni.corso, id));
        
        // Delete the course
        await db.delete(corsi).where(eq(corsi.id, id));

        return json({ success: true, message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        return json({ success: false, message: 'Something went wrong' }, { status: 500 });
    }
};
