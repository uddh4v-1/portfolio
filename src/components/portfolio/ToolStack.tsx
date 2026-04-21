import { motion } from 'framer-motion';
import { toolStack } from '../../constants/tech';

type Tool = { name: string; icon: string };

function ToolItem({ tool }: { tool: Tool }) {
  return (
    <div className="shrink-0 flex flex-col items-center gap-1.5 mx-3 md:mx-4 group cursor-default">
      <div className="w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-gray-50 dark:bg-white/10 border border-gray-100 dark:border-white/10 flex items-center justify-center p-2.5 md:p-3 group-hover:border-gray-300 dark:group-hover:border-white/30 group-hover:shadow-sm transition-all">
        <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain" />
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{tool.name}</span>
    </div>
  );
}

export default function ToolStack() {
  const doubled = [...toolStack, ...toolStack, ...toolStack, ...toolStack];

  return (
    <section id="skills" className="py-12 md:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 md:mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center tracking-tight"
        >
          Tool Stack
        </motion.h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white dark:from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white dark:from-background to-transparent z-10 pointer-events-none" />
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee py-2">
            {doubled.map((tool, i) => (
              <ToolItem key={`${tool.name}-${i}`} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
