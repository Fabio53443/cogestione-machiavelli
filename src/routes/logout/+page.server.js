import { page } from '$app/state';
import { redirect } from '@sveltejs/kit';

    export const load = async ({ cookies }) => {
        cookies.delete('token', { path: '/' });
        throw redirect(302, '/');
    };
