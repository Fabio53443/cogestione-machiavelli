import { json } from '@sveltejs/kit'; // To send JSON responses
import { db } from '$lib/db/db'; // Assuming you're using Drizzle ORM for your database
import bcrypt from 'bcrypt'; // For hashing passwords
import { professori } from '$lib/db/models';
export const POST = async ({ request }) => {
    try {
        const formData = await request.json();
        const { nome, email, password, secretCode } = formData;

        if ( !nome || !email || !password) {
            return json({ success: false, message: 'All fields are required.' }, { status: 400 });
        }
        if (secretCode !== 'skibidi') {
            return json({ success: false, message: 'Codice segreto mancante' }, { status: 403 });
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
