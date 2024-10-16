// src/hooks.server.js
import { jwtVerify } from 'jose';

export async function handle({ event, resolve }) {
    const token = event.cookies.get('token');
    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET); // Convert secret to Uint8Array

    if (token) {
        try {
            const { payload } = await jwtVerify(token, jwtSecret);
            event.locals.user = { username: payload.username }; // Access the username from the payload
        } catch (err) {
            // Token is invalid or expired
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }

    return await resolve(event);
}
