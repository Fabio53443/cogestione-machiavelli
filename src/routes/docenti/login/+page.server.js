import { redirect } from '@sveltejs/kit';

export function load({ locals }) {

    return {
      pageName: 'Login docenti', 
    };
  }