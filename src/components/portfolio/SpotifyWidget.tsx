import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { VinylCard, NeonPillCard, GradientBentoCard, MacOSCard, TerminalCard, type Track } from './SpotifyVariants';

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

  const variants = [
    { label: '1. Vinyl Record', node: <VinylCard track={track} /> },
    { label: '2. Neon Pill',    node: <NeonPillCard track={track} /> },
    { label: '3. Gradient Bento', node: <GradientBentoCard track={track} /> },
    { label: '4. macOS Widget',  node: <MacOSCard track={track} /> },
    { label: '5. Retro Terminal', node: <TerminalCard track={track} /> },
  ];

  return (
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-50">
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.06}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
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
          width: '20rem',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        className="flex flex-col gap-4 pr-1"
      >
        {variants.map(({ label, node }) => (
          <div key={label}>
            <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-600 mb-1.5 px-1">{label}</p>
            {node}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
