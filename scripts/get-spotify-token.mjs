/**
 * Run once to get your Spotify refresh token:
 *   node scripts/get-spotify-token.mjs
 *
 * Before running:
 *  1. Go to https://developer.spotify.com/dashboard → Create app
 *  2. Add Redirect URI:  http://127.0.0.1:8888/callback
 *  3. Paste your Client ID + Secret below
 */

import http from 'http';
import { exec } from 'child_process';

const CLIENT_ID     = 'PASTE_CLIENT_ID_HERE';
const CLIENT_SECRET = 'PASTE_CLIENT_SECRET_HERE';
const REDIRECT_URI  = 'http://127.0.0.1:8888/callback';
const SCOPES        = 'user-read-currently-playing user-read-recently-played';

if (CLIENT_ID === 'PASTE_CLIENT_ID_HERE' || CLIENT_SECRET === 'PASTE_CLIENT_SECRET_HERE') {
  console.error('\n⚠️  Fill in CLIENT_ID and CLIENT_SECRET in this file first.\n');
  process.exit(1);
}

const authUrl =
  'https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  `&client_id=${CLIENT_ID}` +
  `&scope=${encodeURIComponent(SCOPES)}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

const opener = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
exec(`${opener} "${authUrl}"`);
console.log('\nOpening Spotify login… waiting for callback on :8888\n');

const server = http.createServer(async (req, res) => {
  const code = new URL(req.url, 'http://localhost:8888').searchParams.get('code');
  if (!code) { res.end('Missing code.'); return; }

  const creds = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${creds}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI }),
  });
  const data = await tokenRes.json();

  if (!data.refresh_token) { res.end('Error: ' + JSON.stringify(data)); server.close(); return; }

  console.log('✅ Add these to Vercel → Settings → Environment Variables:\n');
  console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
  console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
  console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);

  res.end('<h2 style="font-family:sans-serif">✅ Done! Check your terminal. You can close this tab.</h2>');
  server.close();
  process.exit(0);
});

server.listen(8888, '127.0.0.1');
