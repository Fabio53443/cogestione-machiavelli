// src/hooks.server.js
import { setupDatabase } from '$lib/db/setup';

/* export async function handle({ event, resolve }) {
    await setupDatabase(); // Ensure the database is set up
    return await resolve(event); // Resolve the request and return the response
} */
await setupDatabase(); // Ensure the database is set up