// src/hooks.server.js
import { jwtVerify } from 'jose';
import { rollupVersion } from 'vite';

export async function handle({ event, resolve }) {
    let token = event.cookies.get('token');
    
    if (!token) {
        const authHeader = event.request.headers.get('authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7); 
        }
    }

    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);

    if (token) {
        try {
            const { payload } = await jwtVerify(token, jwtSecret);
            event.locals.user = {
                username: payload.username,
                id: payload.id,
                role: payload.role, 
                nome_completo: payload.nome_completo
            };
        } catch (err) {
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }

    return await resolve(event);
}