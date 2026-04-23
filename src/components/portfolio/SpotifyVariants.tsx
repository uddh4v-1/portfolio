import { motion, AnimatePresence } from 'framer-motion';

export type Track = {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumArt: string | null;
  url: string;
};

type Props = {
  track: Track | null | 'loading';
};

const SpotifyLogo = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

/* ── 1. VINYL RECORD ─────────────────────────────────────────────── */
export function VinylCard({ track }: Props) {
  const isLoading = track === 'loading';
  const hasTrack = track !== null && track !== 'loading';
  const isPlaying = hasTrack && (track as Track).isPlaying;
  const t = hasTrack ? (track as Track) : null;

  return (
    <div className="w-48 rounded-3xl bg-gray-950 border border-white/10 shadow-2xl overflow-hidden p-5 flex flex-col items-center gap-3">
      {/* Vinyl */}
      <div className="relative w-28 h-28">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-gray-800"
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 4, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
          style={{ background: 'conic-gradient(from 0deg, #1a1a1a 0%, #2a2a2a 25%, #1a1a1a 50%, #333 75%, #1a1a1a 100%)' }}
        />
        {/* Album art center */}
        <div className="absolute inset-[22%] rounded-full overflow-hidden ring-2 ring-gray-700">
          {isLoading ? (
            <div className="w-full h-full bg-gray-800 animate-pulse" />
          ) : t?.albumArt ? (
            <img src={t.albumArt} alt="album" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-green-950 flex items-center justify-center">
              <SpotifyLogo className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>
        {/* Center hole */}
        <div className="absolute inset-[44%] rounded-full bg-gray-950 ring-1 ring-gray-700" />
        {/* Playing glow */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute -inset-2 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)', filter: 'blur(8px)' }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="text-center w-full">
        <div className="flex items-center justify-center gap-1 mb-1">
          <SpotifyLogo className="w-3 h-3 text-green-500" />
          <span className="text-[9px] font-bold tracking-widest uppercase text-green-500">
            {isPlaying ? 'Now Playing' : hasTrack ? 'Last Played' : 'Spotify'}
          </span>
        </div>
        {isLoading ? (
          <>
            <div className="h-2.5 w-24 bg-gray-800 rounded-full animate-pulse mx-auto mb-1.5" />
            <div className="h-2 w-16 bg-gray-800/60 rounded-full animate-pulse mx-auto" />
          </>
        ) : t ? (
          <a href={t.url} target="_blank" rel="noopener noreferrer">
            <p className="text-xs font-bold text-white truncate">{t.title}</p>
            <p className="text-[10px] text-gray-500 truncate mt-0.5">{t.artist}</p>
          </a>
        ) : (
          <p className="text-xs text-gray-600">Not connected</p>
        )}
      </div>
    </div>
  );
}

/* ── 2. NEON PILL ────────────────────────────────────────────────── */
export function NeonPillCard({ track }: Props) {
  const isLoading = track === 'loading';
  const hasTrack = track !== null && track !== 'loading';
  const isPlaying = hasTrack && (track as Track).isPlaying;
  const t = hasTrack ? (track as Track) : null;

  return (
    <motion.div
      className="relative"
      animate={isPlaying ? { filter: ['drop-shadow(0 0 6px #22c55e)', 'drop-shadow(0 0 14px #22c55e)', 'drop-shadow(0 0 6px #22c55e)'] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-full bg-black border border-green-500/60 w-72">
        {/* Album art */}
        <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden ring-1 ring-green-500/40">
          {isLoading ? (
            <div className="w-full h-full bg-green-950 animate-pulse" />
          ) : t?.albumArt ? (
            <img src={t.albumArt} alt="album" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-green-950 flex items-center justify-center">
              <SpotifyLogo className="w-3.5 h-3.5 text-green-500" />
            </div>
          )}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          {isLoading ? (
            <div className="h-2 w-32 bg-green-900/40 rounded-full animate-pulse" />
          ) : t ? (
            <a href={t.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 min-w-0">
              <span className="text-xs font-semibold text-green-400 truncate">{t.title}</span>
              <span className="text-green-700 shrink-0">·</span>
              <span className="text-[10px] text-green-700 truncate">{t.artist}</span>
            </a>
          ) : (
            <span className="text-xs text-green-900">Not connected</span>
          )}
        </div>

        {/* Status dot / bars */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3.5 shrink-0">
            {[0, 0.2, 0.1].map((d, i) => (
              <motion.div key={i} className="w-0.5 rounded-full bg-green-400"
                animate={{ height: ['3px', '14px', '4px'] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: d, ease: 'easeInOut' }} />
            ))}
          </div>
        ) : (
          <div className="w-1.5 h-1.5 rounded-full bg-green-900 shrink-0" />
        )}
      </div>
    </motion.div>
  );
}

/* ── 3. GRADIENT BENTO ───────────────────────────────────────────── */
export function GradientBentoCard({ track }: Props) {
  const isLoading = track === 'loading';
  const hasTrack = track !== null && track !== 'loading';
  const isPlaying = hasTrack && (track as Track).isPlaying;
  const t = hasTrack ? (track as Track) : null;

  return (
    <div className="relative w-72 h-36 rounded-2xl overflow-hidden shadow-2xl">
      {/* Blurred album art background */}
      {t?.albumArt && (
        <img src={t.albumArt} alt="" className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{ filter: 'blur(18px) brightness(0.4)' }} />
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(21,128,61,0.5) 100%)' }} />

      {/* Content */}
      <div className="relative h-full flex items-center gap-4 px-4">
        {/* Album art */}
        <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden shadow-xl ring-2 ring-white/10">
          {isLoading ? (
            <div className="w-full h-full bg-white/10 animate-pulse" />
          ) : t?.albumArt ? (
            <img src={t.albumArt} alt="album" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-green-900/60 flex items-center justify-center">
              <SpotifyLogo className="w-7 h-7 text-green-400" />
            </div>
          )}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <SpotifyLogo className="w-3 h-3 text-green-400" />
            <span className="text-[9px] font-bold tracking-widest uppercase text-green-400">
              {isPlaying ? 'Now Playing' : hasTrack ? 'Last Played' : 'Spotify'}
            </span>
          </div>
          {isLoading ? (
            <>
              <div className="h-3 w-28 bg-white/20 rounded-full animate-pulse mb-2" />
              <div className="h-2 w-20 bg-white/10 rounded-full animate-pulse" />
            </>
          ) : t ? (
            <a href={t.url} target="_blank" rel="noopener noreferrer">
              <p className="text-base font-bold text-white truncate leading-tight">{t.title}</p>
              <p className="text-xs text-white/60 truncate mt-0.5">{t.artist}</p>
            </a>
          ) : (
            <p className="text-sm font-bold text-white/40">Not connected</p>
          )}

          {/* Equalizer bars */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3 mt-2">
              {[0, 0.15, 0.3, 0.1, 0.25].map((d, i) => (
                <motion.div key={i} className="w-0.5 rounded-full bg-green-400/70"
                  animate={{ height: ['2px', '12px', '4px'] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: d, ease: 'easeInOut' }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── 4. macOS CONTROL CENTER ─────────────────────────────────────── */
export function MacOSCard({ track }: Props) {
  const isLoading = track === 'loading';
  const hasTrack = track !== null && track !== 'loading';
  const isPlaying = hasTrack && (track as Track).isPlaying;
  const t = hasTrack ? (track as Track) : null;

  return (
    <div className="w-64 rounded-2xl bg-white/90 dark:bg-[#1c1c1e]/90 border border-black/8 dark:border-white/8 shadow-xl overflow-hidden"
      style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
      <div className="flex items-center gap-3 p-3">
        {/* Album art */}
        <div className="shrink-0 w-11 h-11 rounded-lg overflow-hidden shadow-md">
          {isLoading ? (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
          ) : t?.albumArt ? (
            <img src={t.albumArt} alt="album" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <SpotifyLogo className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>

        {/* Track info */}
        <div className="min-w-0 flex-1">
          {isLoading ? (
            <>
              <div className="h-2.5 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mb-1.5" />
              <div className="h-2 w-16 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse mb-2" />
              <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full" />
            </>
          ) : t ? (
            <a href={t.url} target="_blank" rel="noopener noreferrer">
              <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{t.title}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate mt-0.5">{t.artist}</p>
              {/* Progress bar */}
              <div className="mt-1.5 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gray-800 dark:bg-white rounded-full"
                  animate={isPlaying ? { width: ['15%', '85%'] } : { width: '35%' }}
                  transition={{ duration: 60, ease: 'linear', repeat: isPlaying ? Infinity : 0 }} />
              </div>
            </a>
          ) : (
            <p className="text-xs text-gray-400">Not connected</p>
          )}
        </div>

        {/* Play state */}
        <div className="shrink-0">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-4">
              {[0, 0.2, 0.1].map((d, i) => (
                <motion.div key={i} className="w-0.5 rounded-full bg-green-500"
                  animate={{ height: ['2px', '16px', '4px'] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: d, ease: 'easeInOut' }} />
              ))}
            </div>
          ) : (
            <SpotifyLogo className="w-4 h-4 text-green-500" />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── 5. RETRO TERMINAL ───────────────────────────────────────────── */
export function TerminalCard({ track }: Props) {
  const isLoading = track === 'loading';
  const hasTrack = track !== null && track !== 'loading';
  const isPlaying = hasTrack && (track as Track).isPlaying;
  const t = hasTrack ? (track as Track) : null;

  return (
    <div className="w-72 rounded-xl overflow-hidden border border-green-500/30 shadow-2xl shadow-green-950/40"
      style={{ background: '#0a0a0a', fontFamily: '"Courier New", Courier, monospace' }}>
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-green-500/20 bg-green-950/20">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-[10px] text-green-500/60 tracking-widest uppercase">spotify.sh</span>
      </div>

      {/* Terminal body */}
      <div className="px-4 py-3 relative" style={{ textShadow: '0 0 8px rgba(34,197,94,0.8)' }}>
        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)' }} />

        <p className="text-[10px] text-green-500/50 mb-2">$ spotify --now-playing</p>

        {isLoading ? (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xs">{'>'}</span>
              <div className="h-2 w-32 bg-green-900/40 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500/50 text-xs">{'~'}</span>
              <div className="h-2 w-20 bg-green-900/20 rounded animate-pulse" />
            </div>
          </div>
        ) : t ? (
          <a href={t.url} target="_blank" rel="noopener noreferrer" className="block">
            <div className="flex items-start gap-2">
              <span className="text-green-400 text-xs mt-0.5 shrink-0">{'>'}</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-green-400 truncate">{t.title}</p>
                <p className="text-[10px] text-green-600 truncate">by {t.artist}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[9px] text-green-700">STATUS</span>
              <span className={`text-[9px] font-bold ${isPlaying ? 'text-green-400' : 'text-green-700'}`}>
                {isPlaying ? '● PLAYING' : '○ PAUSED'}
              </span>
              {isPlaying && (
                <motion.span className="text-[9px] text-green-600"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}>
                  ▋
                </motion.span>
              )}
            </div>
          </a>
        ) : (
          <p className="text-xs text-green-900">Error: env vars not set</p>
        )}
      </div>
    </div>
  );
}
