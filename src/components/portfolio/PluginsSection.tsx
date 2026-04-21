import { plugins } from '../../constants/plugins';

export default function PluginsSection() {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Plugins</h2>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">Built from vibe coding and actual design pain</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plugins.map((plugin) => (
          <a
            key={plugin.name}
            href={plugin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 hover:shadow-lg dark:hover:shadow-black/30 transition-all duration-300"
          >
            <div className="overflow-hidden bg-gray-50 dark:bg-white/5" style={{ aspectRatio: '16/9' }}>
              <img
                src={plugin.image}
                alt={plugin.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                {plugin.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
