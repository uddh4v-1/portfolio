import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const dropColors = ['var(--brand)', '#f97316', '#a855f7', '#22c55e'];

export default function WIPBanner() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.6 }}
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-3 rounded-full
            bg-white/95 dark:bg-gray-950/95
            shadow-lg shadow-black/10 dark:shadow-2xl dark:shadow-black/40
            backdrop-blur-md
            px-3 sm:px-4 py-2 sm:py-2.5
            max-w-[calc(100vw-2rem)] overflow-hidden"
          style={{ border: '1px solid color-mix(in srgb, var(--brand) 25%, transparent)' }}
        >
          {/* Paint can + drips */}
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
            <motion.span
              className="text-base sm:text-lg select-none"
              style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
              animate={{ rotate: [0, -20, -20, 0, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' }}
            >
              🪣
            </motion.span>

            {dropColors.map((color, i) => (
              <motion.span
                key={i}
                className="absolute"
                style={{
                  width: 5,
                  height: 7,
                  background: color,
                  borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
                  left: 2 + i * 5,
                  top: 20,
                }}
                animate={{ y: [0, 22], opacity: [0, 1, 0], scaleY: [0.5, 1.2, 0.6] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.28 + 1, ease: 'easeIn' }}
              />
            ))}
          </div>

          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
            <span className="font-semibold" style={{ color: 'var(--brand)' }}>Work in progress</span>
            <span className="hidden sm:inline">{' — '}still painting the walls</span>
          </span>

          <button
            onClick={() => setDismissed(true)}
            className="ml-1 shrink-0 rounded-full p-0.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-white/10 transition-colors"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
