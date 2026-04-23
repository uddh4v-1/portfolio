import { motion } from 'framer-motion';
import { experiences, education } from '../../constants/personal';

const STAGGER_BASE_DELAY = 0.1;
const STAGGER_STEP = 0.08;

export default function CareerTimeline() {
  return (
    <section className="py-12 md:py-16 px-6 max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold text-gray-900 dark:text-white mb-10 tracking-tight"
      >
        Journey
      </motion.h2>

      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-100 dark:bg-white/10" />

        <div className="space-y-10">

          {/* Work */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-5 pl-6">
              Work
            </p>
            {experiences.map((exp, ei) => (
              <div key={exp.company} className="mb-6 last:mb-0">
                <div className="flex items-center gap-3 mb-3 pl-6 relative">
                  <span
                    className="absolute left-0 w-4 h-4 rounded-full bg-white dark:bg-background border-2 border-gray-200 dark:border-white/20 flex items-center justify-center text-[10px]"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                  >
                    {exp.logo}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{exp.company}</span>
                </div>

                <div className="pl-6 space-y-3">
                  {exp.roles.map((role, ri) => (
                    <motion.div
                      key={role.title}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: STAGGER_BASE_DELAY + (ei + ri) * STAGGER_STEP }}
                      className="flex items-start justify-between gap-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 px-4 py-3"
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{role.title}</span>
                      <span className="text-[11px] text-gray-400 dark:text-gray-600 font-mono shrink-0 pt-0.5">{role.period}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-5 pl-6">
              Education
            </p>
            <div className="pl-6 space-y-3">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: STAGGER_BASE_DELAY + i * STAGGER_STEP }}
                  className="rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 px-4 py-3 relative"
                >
                  <span
                    className="absolute -left-[22px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-background border-2 border-gray-200 dark:border-white/20 flex items-center justify-center text-[10px]"
                  >
                    {edu.logo}
                  </span>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{edu.degree}</p>
                      <p className="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5 truncate">{edu.school}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[11px] text-gray-400 dark:text-gray-600 font-mono">{edu.period}</p>
                      {edu.cgpa && (
                        <p className="text-[11px] text-gray-400 dark:text-gray-600 font-mono">CGPA {edu.cgpa}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
