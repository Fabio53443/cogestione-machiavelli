import { redirect } from '@sveltejs/kit';
import { isAdmin } from '$lib/isAdmin';


export const load = async ({ locals }) => {
    if (!(await isAdmin(locals))) {
        throw redirect(302, '/studente/dashboard');
    }   

    return {
        pageName: 'Amministratori',
        user: locals.user
    };
};
