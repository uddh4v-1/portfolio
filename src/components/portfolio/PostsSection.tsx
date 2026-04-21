const posts = [
  {
    title: 'Top 15 out of 250+ in PropelX 4.0 at Bajaj Finserv Health',
    tags: ['Art Direction', 'Concept'],
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=400&fit=crop',
  },
  {
    title: "Led 'Design with AI' workshop for 50+ Product Managers",
    tags: ['Art Direction', 'Concept'],
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop',
  },
  {
    title: 'Experimented with connecting Cursor AI to Figma via MCP',
    tags: ['Art Direction', 'Concept'],
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=400&fit=crop',
  },
  {
    title: 'Town hall talk on automating Design-to-Code',
    tags: ['Art Direction', 'Concept'],
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=400&fit=crop',
  },
  {
    title: 'Attended INDIA HCI 2024 @ IIT Bombay',
    tags: ['Art Direction', 'Concept'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop',
  },
];

export default function PostsSection() {
  return (
    <section className="py-8 md:py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 md:mb-8">Posts</h2>
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6">
        {posts.map((post, i) => (
          <div
            key={i}
            className="shrink-0 w-40 sm:w-52 md:w-56 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 hover:shadow-md dark:hover:shadow-black/30 transition-shadow"
          >
            <div className="aspect-square overflow-hidden bg-gray-50 dark:bg-white/5">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 md:p-4">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-snug mb-2">{post.title}</p>
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-gray-600 dark:text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
