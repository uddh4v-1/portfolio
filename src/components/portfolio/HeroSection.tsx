import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personal } from '../../constants/personal';

const terminalLines = [
  { prompt: '$ whoami',          output: 'Uddhav Powar' },
  { prompt: '$ cat role.txt',    output: 'Software Engineer @ Cybage' },
  { prompt: '$ cat exp.txt',     output: '4+ years · Full Stack · Scalable Systems' },
  { prompt: '$ ls skills/',      output: 'React  TypeScript  Node.js  Python  AWS  Docker' },
  { prompt: '$ cat status.txt',  output: '🟢 Open to opportunities' },
];

function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [phase, setPhase] = useState<'prompt' | 'output'>('prompt');

  useEffect(() => {
    if (visibleLines >= terminalLines.length) return;
    const line = terminalLines[visibleLines];
    const target = phase === 'prompt' ? line.prompt : line.output;

    if (currentText.length < target.length) {
      const speed = phase === 'prompt' ? 45 : 18;
      const t = setTimeout(() => setCurrentText(target.slice(0, currentText.length + 1)), speed);
      return () => clearTimeout(t);
    }

    if (phase === 'prompt') {
      const t = setTimeout(() => { setPhase('output'); setCurrentText(''); }, 300);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines((v) => v + 1);
        setPhase('prompt');
        setCurrentText('');
      }, 600);
      return () => clearTimeout(t);
    }
  }, [currentText, phase, visibleLines]);

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 bg-gray-950 font-mono text-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-3 text-xs text-gray-400">uddhav@portfolio ~ </span>
      </div>
      {/* Body */}
      <div className="p-5 space-y-3 min-h-64">
        {/* Completed lines */}
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div key={i}>
            <div className="text-green-400">{line.prompt}</div>
            <div className="text-gray-300 mt-0.5 pl-1">{line.output}</div>
          </div>
        ))}
        {/* Current line being typed */}
        {visibleLines < terminalLines.length && (
          <div>
            <div className="text-green-400">
              {phase === 'prompt' ? currentText : terminalLines[visibleLines].prompt}
              {phase === 'prompt' && <span className="animate-pulse bg-green-400 text-green-400 ml-0.5">▋</span>}
            </div>
            {phase === 'output' && (
              <div className="text-gray-300 mt-0.5 pl-1">
                {currentText}
                <span className="animate-pulse bg-gray-300 text-gray-300 ml-0.5">▋</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center px-6 pt-28 pb-16 min-h-screen overflow-hidden">

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none dark:hidden"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 60%, transparent 100%)' }} />
      <div className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, oklch(0.06 0.01 250 / 0.97) 0%, oklch(0.06 0.01 250 / 0.7) 60%, transparent 100%)' }} />

      {/* Split layout */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Left — text */}
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/20 mb-6 shadow-sm backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_2px_rgba(34,197,94,0.5)] animate-pulse" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Currently at Cybage</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-4"
          >
            <span className="text-gray-900 dark:text-white">Uddhav</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Powar
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-sm whitespace-pre-line"
          >
            {personal.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex items-center gap-3"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-200 hover:border-gray-400 dark:hover:border-white/40 transition-all hover:-translate-y-0.5"
            >
              Resume →
            </a>
          </motion.div>
        </div>

        {/* Right — terminal */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
