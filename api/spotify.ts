import type { VercelRequest, VercelResponse } from '@vercel/node';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  external_urls: { spotify: string };
};

async function getAccessToken() {
  const creds = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${creds}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: SPOTIFY_REFRESH_TOKEN ?? '' }),
  });
  const data = await res.json() as { access_token: string };
  return data.access_token;
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return res.status(200).json({ isPlaying: false });
  }

  try {
    const token = await getAccessToken();

    const nowRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (nowRes.status === 204 || nowRes.status >= 400) {
      const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const recent = await recentRes.json() as { items: { track: SpotifyTrack }[] };
      const track = recent.items?.[0]?.track;
      if (!track) return res.status(200).json({ isPlaying: false });
      return res.status(200).json({
        isPlaying: false,
        title: track.name,
        artist: track.artists.map(a => a.name).join(', '),
        albumArt: track.album.images[0]?.url ?? null,
        url: track.external_urls.spotify,
      });
    }

    const data = await nowRes.json() as { item: SpotifyTrack; is_playing: boolean };
    const track = data.item;
    return res.status(200).json({
      isPlaying: data.is_playing,
      title: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      albumArt: track.album.images[0]?.url ?? null,
      url: track.external_urls.spotify,
    });
  } catch {
    return res.status(200).json({ isPlaying: false });
  }
}
