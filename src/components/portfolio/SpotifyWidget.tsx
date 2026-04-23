import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, GripHorizontal } from 'lucide-react';
import { SPOTIFY_REFRESH_INTERVAL } from '../../constants/animations';
import { useWidgetDrag } from '../../hooks/use-widget-drag';

type Track = {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumArt: string | null;
  url: string;
};

const SPOTIFY_API_ENDPOINT = '/api/spotify';
const WIDGET_INLINE_MAX_WIDTH = 'min(320px, calc(100vw - 3rem))';
const WIDGET_FIXED_MAX_WIDTH = '260px';
const WIDGET_FIXED_LEFT = 360;
const WIDGET_FIXED_TOP = '26vh';
const BAR_ANIMATION_DELAYS = [0, 0.15, 0.3];
const BAR_STATIC_HEIGHTS = [8, 5, 10];

export default function SpotifyWidget() {
  const [track, setTrack] = useState<Track | null | 'loading'>('loading');
  const [isHovered, setIsHovered] = useState(false);
  const { isDragging, setIsDragging, isMobile } = useWidgetDrag();
  const viewportRef = useRef(document.documentElement);

  const fetchTrack = () => {
    fetch(SPOTIFY_API_ENDPOINT)
      .then(r => r.json())
      .then((d: Partial<Track>) => {
        if (d.title) setTrack(d as Track);
        else setTrack(null);
      })
      .catch(() => setTrack(null));
  };

  useEffect(() => {
    fetchTrack();
    const id = setInterval(fetchTrack, SPOTIFY_REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const isLoading = track === 'loading';
  const hasTrack = track !== null && track !== 'loading';

  const widget = (
    <motion.div
      drag={!isMobile}
      dragMomentum={false}
      dragElastic={0.05}
      dragConstraints={isMobile ? undefined : viewportRef}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onDragStart={() => { setIsDragging(true); setIsHovered(false); }}
      onDragEnd={() => setIsDragging(false)}
      whileDrag={{ scale: 1.04, zIndex: 50 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      style={{
        ...(isMobile ? {
          maxWidth: WIDGET_INLINE_MAX_WIDTH,
        } : {
          position: 'fixed' as const,
          left: WIDGET_FIXED_LEFT,
          top: WIDGET_FIXED_TOP,
          maxWidth: WIDGET_FIXED_MAX_WIDTH,
        }),
        cursor: isMobile ? 'default' : isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        zIndex: 40,
      }}
      className="relative inline-flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-lg"
    >
      <AnimatePresence>
        {isHovered && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500 bg-white dark:bg-white/10 border border-gray-100 dark:border-white/10 px-2.5 py-1 rounded-full shadow-sm pointer-events-none select-none z-50"
          >
            <GripHorizontal className="w-3 h-3" />
            drag me
          </motion.div>
        )}
      </AnimatePresence>

      {hasTrack && (track as Track).albumArt ? (
        <img src={(track as Track).albumArt!} alt="album" className="w-9 h-9 rounded-lg shrink-0 object-cover" />
      ) : (
        <div className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-white/10 flex items-center justify-center shrink-0">
          <Music className="w-4 h-4 text-gray-400" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        {isLoading ? (
          <>
            <div className="h-2 w-16 bg-gray-200 dark:bg-white/10 rounded animate-pulse mb-1.5" />
            <div className="h-2 w-24 bg-gray-200 dark:bg-white/10 rounded animate-pulse mb-1" />
            <div className="h-2 w-16 bg-gray-100 dark:bg-white/5 rounded animate-pulse" />
          </>
        ) : hasTrack ? (
          <a
            href={(track as Track).url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity"
            onClick={e => { if (isDragging) e.preventDefault(); }}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <div className="flex items-end gap-0.5 h-3 shrink-0">
                {(track as Track).isPlaying ? (
                  BAR_ANIMATION_DELAYS.map(delay => (
                    <motion.div
                      key={delay}
                      className="w-0.75 rounded-sm bg-green-500"
                      animate={{ height: ['4px', '12px', '4px'] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay, ease: 'easeInOut' }}
                    />
                  ))
                ) : (
                  BAR_STATIC_HEIGHTS.map((h, i) => (
                    <div key={i} className="w-0.75 rounded-sm bg-gray-300 dark:bg-gray-600" style={{ height: h }} />
                  ))
                )}
              </div>
              <span className="text-[10px] font-mono text-green-600 dark:text-green-400">
                {(track as Track).isPlaying ? 'Now playing' : 'Last played'}
              </span>
            </div>
            <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{(track as Track).title}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{(track as Track).artist}</p>
          </a>
        ) : (
          <>
            <p className="text-[10px] font-mono text-gray-400 dark:text-gray-600 mb-0.5">Not connected</p>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">Spotify</p>
            <p className="text-[10px] text-gray-300 dark:text-gray-700">Add env vars to activate</p>
          </>
        )}
      </div>
    </motion.div>
  );

  return isMobile ? widget : createPortal(widget, document.body);
}
