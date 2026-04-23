import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { personal } from '../../constants/personal';
import { heroRoles } from '../../constants/tech';
import { locationPhotos, flagUrl } from '../../constants/carousel';
import SpotifyWidget from './SpotifyWidget';

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex(i => (i + 1) % heroRoles.length), 1800);
    const p = setInterval(() => setPhotoIndex(i => (i + 1) % locationPhotos.length), 2500);
    return () => { clearInterval(t); clearInterval(p); };
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 bg-background overflow-hidden -mt-8 md:mt-0">

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none dark:hidden"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(249,115,22,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(249,115,22,0.08) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* Open to work badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-4 sm:mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50 px-4 py-1.5 text-sm font-medium text-green-700 dark:text-green-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Open to work
          </span>
        </motion.div>

        {/* Line 1: I'm [name] [avatar] */}
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight flex items-baseline justify-center gap-x-2 sm:gap-x-3 md:gap-x-4 mb-2">
          <span className="text-gray-400 dark:text-gray-500">I'm</span>
          <span className="text-gray-900 dark:text-white">{personal.firstName}</span>
          <img src={personal.avatar} alt={personal.firstName} className="shrink-0 w-auto h-16 sm:h-20 md:h-24 lg:h-28 drop-shadow-lg" />
          <span className="text-gray-400 dark:text-gray-500">,</span>
        </div>

        {/* Line 2: a Full Stack [cycling badge] Engineer */}
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight flex items-center justify-center gap-x-2 sm:gap-x-3 md:gap-x-4 mb-2">
          <span className="text-gray-400 dark:text-gray-500">a</span>
          <span className="text-gray-900 dark:text-white">Full Stack</span>

          <span className="inline-flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 overflow-hidden shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16">
            <AnimatePresence mode="wait">
              <motion.img
                key={roleIndex}
                src={heroRoles[roleIndex].img}
                alt={heroRoles[roleIndex].name}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </span>

          <span className="text-gray-900 dark:text-white">Engineer</span>
        </div>

        {/* Line 3: based in [India badge] */}
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight flex items-center justify-center gap-x-2 sm:gap-x-3 md:gap-x-4 mb-6 sm:mb-8 md:mb-12">
          <span className="text-gray-400 dark:text-gray-500">based in</span>

          <span className="inline-flex items-center rounded-full overflow-hidden border-2 border-gray-200 dark:border-white/10 shadow-md shrink-0 relative w-16 h-9 sm:w-20 sm:h-11 md:w-24 md:h-14 lg:w-28 lg:h-16 bg-gray-200 dark:bg-gray-800">
            <AnimatePresence mode="wait">
              <motion.img
                key={photoIndex}
                src={locationPhotos[photoIndex]}
                alt="India"
                className="w-full h-full object-cover absolute inset-0"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </AnimatePresence>
          </span>
          <span className="inline-flex items-center gap-2 sm:gap-3 text-gray-900 dark:text-white">
            {personal.location},
            <motion.span
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="inline-block"
            >
              <span className="animate-flag-3d inline-block">
                <img
                  src={flagUrl}
                  alt="India flag"
                  className="rounded-lg shadow-md w-10 h-7 sm:w-14 sm:h-9 md:w-16 md:h-11 lg:w-20 lg:h-14 object-cover"
                />
              </span>
            </motion.span>
          </span>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg mb-6 md:mb-10"
        >
          Turning ambiguous problems into{' '}
          <span className="text-gray-900 dark:text-white underline underline-offset-4" style={{ textDecorationColor: 'var(--brand)' }}>clean, reliable software</span>
          {' '}teams are proud to ship.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href={personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 text-white text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5 shadow-lg"
            style={{ background: 'var(--brand)', boxShadow: '0 4px 14px var(--brand-shadow)' }}
          >
            Let's work together
          </a>
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/resume.pdf';
              link.download = 'resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-7 py-3.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            Resume
          </button>
        </motion.div>

        {/* Spotify widget — fixed/draggable, floats above page */}
        <SpotifyWidget />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-gray-300 dark:text-gray-700 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-gray-300 dark:text-gray-700" />
        </motion.div>
      </motion.div>
    </section>
  );
}
