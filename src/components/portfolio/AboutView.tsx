import { motion } from 'framer-motion';
import AboutHero from './AboutHero';
import { TextReveal } from '../ui/text-reveal';
import { personal, currently, values, interests } from '../../constants/personal';

const SECTION_STAGGER = 0.08;
const VIDEO_PLACEHOLDER_PREFIX = 'REPLACE';

export default function AboutView() {
  const hasVideos = personal.adventureVideoIds.some(id => !id.startsWith(VIDEO_PLACEHOLDER_PREFIX));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="pt-14"
    >
      <AboutHero />
      <TextReveal className="mb-16 md:mb-24">{personal.aboutBio}</TextReveal>

      {/* Currently */}
      <section className="py-8 px-6 max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight"
        >
          Currently
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(
            [
              { label: 'Role', value: currently.role, emoji: '💼' },
              { label: 'Building', value: currently.building, emoji: '🔨' },
              { label: 'Side quest', value: currently.sideQuest, emoji: '☕' },
            ] as const
          ).map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * SECTION_STAGGER }}
              className="rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 px-4 py-4"
            >
              <div className="text-xl mb-2">{item.emoji}</div>
              <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-gray-400 dark:text-gray-600 mb-1">{item.label}</p>
              <p className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-snug">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-8 px-6 max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight"
        >
          How I work
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * SECTION_STAGGER }}
              className="rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 px-5 py-5"
            >
              <div className="text-2xl mb-3">{val.emoji}</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{val.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{val.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interests */}
      <section className="py-8 px-6 max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight"
        >
          Beyond the screen
        </motion.h2>
        <div className="flex flex-wrap gap-2">
          {interests.map((item, i) => (
            <motion.span
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-sm text-gray-700 dark:text-gray-300"
            >
              <span>{item.emoji}</span>
              {item.label}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Life & Adventure — only renders when real video IDs are provided */}
      {hasVideos && (
        <section className="py-12 px-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Life & Adventure</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Moments beyond the screen.</p>
          <div className="flex flex-col gap-4">
            {personal.adventureVideoIds.map((id, i) => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-video bg-gray-100 dark:bg-white/5">
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`Adventure video ${i + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}
