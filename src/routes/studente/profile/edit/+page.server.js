import { redirect } from '@sveltejs/kit';
export const load = ({ locals }) => {
    if (!locals.user || locals.user.role !== 'studente') {
        throw redirect(302, '/login');
    }
    
    return {
        pageName: 'Profilo',
        user: locals.user,
    };
};
