import React from 'react';

const projects = [
  {
    title: 'Simplifying reimbursement for policyholders',
    subtitle: null,
    description: null,
    tags: [],
    image: 'https://media.base44.com/images/public/69e4d6fd3247f4b649ed641e/96604794f_generated_f7162381.png',
    award: null,
    span: 'half',
  },
  {
    title: 'AI Driven Diabetes Care',
    subtitle: 'Crafting a supportive system to help individuals significantly reduce and manage their diabetes effectively',
    description: null,
    tags: ['Monitoring', 'Tracking', 'Health Care', 'Insights', 'HbA1c Levels', 'AI Integration'],
    image: 'https://media.base44.com/images/public/69e4d6fd3247f4b649ed641e/1d88c215d_generated_58517dd1.png',
    award: null,
    span: 'half',
  },
  {
    title: 'A self-initiated exploration into EV service design',
    subtitle: null,
    description: null,
    tags: [],
    image: 'https://media.base44.com/images/public/69e4d6fd3247f4b649ed641e/2afcebd00_generated_b4820087.png',
    award: null,
    span: 'half',
  },
  {
    title: 'A self-initiated library app to boost discovery and usage',
    subtitle: null,
    description: null,
    tags: [],
    image: 'https://media.base44.com/images/public/69e4d6fd3247f4b649ed641e/00a595568_generated_f803e47c.png',
    award: null,
    span: 'half',
  },
  {
    title: 'Voice Configurator for AI Voice Agent',
    subtitle: 'Powering faster, smarter conversations',
    description: null,
    tags: ['Chips'],
    image: 'https://media.base44.com/images/public/69e4d6fd3247f4b649ed641e/4cd8a0d29_generated_aa98d183.png',
    award: 'SHarp sharK award',
    span: 'full',
  },
];

export default function ProjectsSection() {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Selected work</h2>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">Projects crafted to solve real problems</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <div
            key={i}
            className={`group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg dark:hover:shadow-black/30 ${
              project.span === 'full' ? 'md:col-span-2' : ''
            }`}
          >
            {/* Image */}
            <div className="relative overflow-hidden bg-gray-50 dark:bg-white/5" style={{ aspectRatio: project.span === 'full' ? '16/7' : '4/3' }}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {project.award && (
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10">
                  🏆 {project.award}
                </div>
              )}
            </div>

            {/* Text */}
            <div className="p-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{project.subtitle}</p>
              )}
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/10 px-2.5 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
