import { useState } from 'react';
import { motion } from 'framer-motion';
import { personal } from '../../constants/personal';
import { EMAIL_COPY_RESET_MS, WAVE_ROTATE_KEYFRAMES } from '../../constants/animations';

const MARQUEE_REPEAT_COUNT = 8;

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), EMAIL_COPY_RESET_MS);
  };

  return (
    <section id="contact" className="py-10 md:py-16 pb-8 text-center px-4 sm:px-6">
      <div className="py-6 overflow-hidden border-t border-b border-gray-100 dark:border-white/10 mb-8 md:mb-16" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
        <div className="animate-marquee flex">
          {Array.from({ length: MARQUEE_REPEAT_COUNT }).map((_, i) => (
            <span key={i} className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-100 dark:text-white/10 mx-4 sm:mx-8 shrink-0 tracking-tight select-none whitespace-nowrap">
              {personal.name.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-5">
            Thanks for dropping by{' '}
            <motion.span
              style={{ display: 'inline-block', transformOrigin: '70% 70%' }}
              animate={{ rotate: WAVE_ROTATE_KEYFRAMES }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              👋
            </motion.span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-10">
            If something here caught your eye, sparked a thought, or just felt right — feel free to reach out.
            Let's create what doesn't exist yet, or make what does feel simpler.
          </p>

          <a
            href={`mailto:${personal.email}`}
            className="inline-block px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-full hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
          >
            Let's connect!
          </a>

          <div className="flex items-center justify-center gap-6 mt-12">
            {[
              {
                label: 'LinkedIn', href: personal.social.linkedin,
                icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
              },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {link.icon}
              </a>
            ))}
            <button
              onClick={copyEmail}
              aria-label="Copy email"
              className="relative text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {copied
                ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
                : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              }
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 shadow">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      <div className="mt-12 md:mt-24 pt-8 border-t border-gray-100 dark:border-white/10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400 dark:text-gray-500">
        <span className="font-semibold text-gray-900 dark:text-white uppercase tracking-widest text-xs">{personal.name}</span>
        <span>{personal.footerTitle}</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </section>
  );
}
