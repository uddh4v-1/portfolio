import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Cloud, LayoutGrid, Briefcase, Lightbulb, Share2, Plus } from 'lucide-react';
import { personal, experiences } from '../../constants/personal';
import { projects } from '../../constants/projects';
import { toolStack } from '../../constants/tech';
import { useNavigate } from 'react-router';

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const t = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata',
      }).format(new Date());
      setTime(`${t} GMT+5:30`);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);
  return <>{time}</>;
}

export default function ResumeView() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground pt-14 pb-24">
      <div className="max-w-xl mx-auto px-5 py-6">

        {/* ── Weather / time bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8 text-xs text-gray-400 dark:text-gray-600 font-mono"
        >
          <span className="flex items-center gap-1.5">
            <Cloud className="w-3.5 h-3.5" />
            {personal.location}, India
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <LiveClock />
          </span>
        </motion.div>

        {/* ── Profile ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mb-8"
        >
          <img
            src={personal.avatar}
            alt={personal.name}
            className="w-16 h-16 rounded-2xl object-cover mb-4 drop-shadow-md"
          />
          <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">{personal.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{personal.footerTitle}</p>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
            Hey, I'm {personal.firstName}. I'm currently working as a {personal.footerTitle} at{' '}
            {experiences.map((exp, i) => (
              <span key={exp.company}>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-800 dark:text-gray-200 text-xs font-medium mx-0.5">
                  <span>{exp.logo}</span>
                  {exp.company}
                </span>
                {i < experiences.length - 1 ? ' and ' : ''}
              </span>
            ))}{' '}
            based in {personal.location}, India 🇮🇳
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {personal.aboutBio.split('. ').slice(1).join('. ')}
          </p>
        </motion.div>

        {/* ── Brands ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-8"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-4">
            Brands I have worked with
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            {experiences.map((exp) => (
              <div key={exp.company} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-xl">
                {exp.logo}
              </div>
            ))}
            {toolStack.slice(0, 5).map((tool) => (
              <div key={tool.name} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center p-2">
                <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="border-t border-gray-100 dark:border-white/10 mb-8" />

        {/* ── Work ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-2">Work</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">A few select projects I've built and shipped</p>

          <div className="grid grid-cols-2 gap-3">
            {projects.filter(p => p.span === 'half').slice(0, 4).map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 aspect-4/3 relative group cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-xs font-medium text-white leading-snug">{project.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {projects.filter(p => p.span === 'full').slice(0, 1).map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-3 rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 relative group cursor-pointer"
              style={{ aspectRatio: '16/7' }}
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              {project.award && (
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10">
                  🏆 {project.award}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-sm font-medium text-white">{project.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* ── Fixed bottom nav ── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-black/40">
          {[
            { icon: LayoutGrid, label: 'Home',  action: () => navigate('/') },
            { icon: Briefcase,  label: 'Work',  action: () => navigate('/') },
            { icon: Lightbulb,  label: 'About', action: () => navigate('/about') },
            { icon: Share2,     label: 'Share', action: () => {} },
            { icon: Plus,       label: 'More',  action: () => {} },
          ].map(({ icon: Icon, label, action }) => (
            <button
              key={label}
              onClick={action}
              title={label}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
