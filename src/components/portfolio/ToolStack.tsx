import { motion } from 'framer-motion';

const tools = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
];

type Tool = { name: string; icon: string };

function ToolItem({ tool }: { tool: Tool }) {
  return (
    <div className="shrink-0 flex flex-col items-center gap-2 mx-4 group cursor-default">
      <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/10 border border-gray-100 dark:border-white/10 flex items-center justify-center p-3 group-hover:border-gray-300 dark:group-hover:border-white/30 group-hover:shadow-sm transition-all">
        <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain" />
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{tool.name}</span>
    </div>
  );
}

export default function ToolStack() {
  const doubled = [...tools, ...tools, ...tools, ...tools];

  return (
    <section id="skills" className="py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 mb-10">
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

      {/* Marquee */}
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
