import { projects } from '../../constants/projects';

export default function ProjectsSection() {
  return (
    <section className="py-8 md:py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Selected work</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">Projects crafted to solve real problems</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <div
            key={i}
            className={`group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg dark:hover:shadow-black/30 ${
              project.span === 'full' ? 'sm:col-span-2' : ''
            }`}
          >
            <div className="relative overflow-hidden bg-gray-50 dark:bg-white/5" style={{ aspectRatio: project.span === 'full' ? '16/7' : '4/3' }}>
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {project.award && (
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10">
                  🏆 {project.award}
                </div>
              )}
            </div>
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
