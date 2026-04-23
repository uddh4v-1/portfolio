import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Track = {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumArt: string | null;
  url: string;
};

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

export default function SpotifyWidget() {
  const [track, setTrack] = useState<Track | null | 'loading'>('loading');
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);

  const fetchTrack = () => {
    fetch('/api/spotify')
      .then(r => r.json())
      .then((d: Partial<Track>) => {
        if (d.title) setTrack(d as Track);
        else setTrack(null);
      })
      .catch(() => setTrack(null));
  };

  useEffect(() => {
    fetchTrack();
    const id = setInterval(fetchTrack, 30_000);
    return () => clearInterval(id);
  }, []);

  const isLoading = track === 'loading';
  const hasTrack = track !== null && track !== 'loading';
  const isPlaying = hasTrack && (track as Track).isPlaying;

  return (
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-50">
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.06}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        whileDrag={{ scale: 1.04 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.5rem',
          cursor: isDragging ? 'grabbing' : 'grab',
          pointerEvents: 'auto',
          userSelect: 'none',
          width: '18rem',
        }}
      >
        {/* Float when idle */}
        <motion.div
          animate={isDragging ? { y: 0 } : { y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: isDragging ? 0 : Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          {/* Green glow when playing */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute -inset-3 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 110%, rgba(34,197,94,0.4) 0%, transparent 65%)', filter: 'blur(12px)' }}
              />
            )}
          </AnimatePresence>

          {/* Card */}
          <div className={`relative rounded-2xl overflow-hidden border transition-all duration-500 ${
            isPlaying
              ? 'bg-gray-950 border-green-500/30 shadow-xl shadow-green-950/30'
              : 'bg-gray-950 border-white/10 shadow-xl shadow-black/30'
          }`}>
            {/* Shimmer line */}
            <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

            {/* Header */}
            <div className={`flex items-center justify-between px-4 pt-3.5 pb-2 ${isPlaying ? 'text-green-400' : 'text-gray-500'}`}>
              <div className="flex items-center gap-1.5">
                <SpotifyIcon />
                <span className="text-[10px] font-bold tracking-widest uppercase">
                  {isLoading ? 'Spotify' : isPlaying ? 'Now Playing' : hasTrack ? 'Last Played' : 'Spotify'}
                </span>
              </div>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3.5">
                  {[0, 0.18, 0.36, 0.12].map((delay, i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 rounded-full bg-green-400"
                      animate={{ height: ['3px', '14px', '5px', '11px', '3px'] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className={`mx-4 h-px ${isPlaying ? 'bg-green-500/20' : 'bg-white/5'}`} />

            {/* Track row */}
            <div className="flex items-center gap-3 px-4 py-3.5">
              {/* Album art */}
              <div className={`shrink-0 w-12 h-12 rounded-xl overflow-hidden ${
                isPlaying ? 'ring-1 ring-green-500/40 shadow-md shadow-green-900/40' : 'ring-1 ring-white/10'
              }`}>
                {isLoading ? (
                  <div className="w-full h-full bg-white/10 animate-pulse" />
                ) : hasTrack && (track as Track).albumArt ? (
                  <img src={(track as Track).albumArt!} alt="album" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-green-950 text-green-500">
                    <SpotifyIcon />
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                {isLoading ? (
                  <>
                    <div className="h-2.5 w-28 bg-white/10 rounded-full animate-pulse mb-2" />
                    <div className="h-2 w-20 bg-white/5 rounded-full animate-pulse" />
                  </>
                ) : hasTrack ? (
                  <a
                    href={(track as Track).url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    onClick={e => { if (isDragging) e.preventDefault(); }}
                  >
                    <p className="text-sm font-semibold text-white truncate leading-snug group-hover:underline underline-offset-2">
                      {(track as Track).title}
                    </p>
                    <p className={`text-xs truncate mt-0.5 ${isPlaying ? 'text-green-400' : 'text-gray-500'}`}>
                      {(track as Track).artist}
                    </p>
                  </a>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-gray-600">Not connected</p>
                    <p className="text-xs text-gray-700 mt-0.5">Add env vars to activate</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
