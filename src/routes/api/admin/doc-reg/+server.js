import { json } from '@sveltejs/kit'; // To send JSON responses
import { db } from '$lib/db/db'; // Assuming you're using Drizzle ORM for your database
import bcrypt from 'bcrypt'; // For hashing passwords
import { professori, studenti } from '$lib/db/models';
import { eq } from 'drizzle-orm';
export const POST = async ({ request, locals }) => {
    try {
        const formData = await request.json();
        const { nome, email, password } = formData;

          if (!locals.user) {
            return json({ success: false, message: "Unauthorized" }, { status: 401 });
          }
        
          const user = await db
            .select({
              admin: studenti.admin,
            })
            .from(studenti)
            .where(eq(studenti.id, locals.user.id));
        
          if (!user[0].admin) {
            throw redirect(302, "/studente/dashboard");
          }
          
        

        if ( !nome || !email || !password) {
            return json({ success: false, message: 'Riempi tutti i campi.' }, { status: 400 });
        }
        // Log the form data for debugging

        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert the new user into the database
        await db.insert(professori).values({
            nomeCompleto: nome,
            email,
            hashedPass: hashedPassword
        });

        return json({ success: true, message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration Error:', error);

        // Handle uniqueness violation for username or email
        if (error.code === '23505') {
            return json({ success: false, message: 'Username or email already exists.' }, { status: 400 });
        }

        return json({ success: false, message: 'Registration failed.' }, { status: 500 });
    }
};
