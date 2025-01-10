import { json, redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { db } from '$lib/db/db';
import { studenti } from '$lib/db/models';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.VITE_PUBLIC_API_URL}/api/studenti/google/callback`
);

export async function GET({ url }) {
  const authorizeUrl = client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['profile', 'email']
  });
  throw redirect(302, authorizeUrl);
}