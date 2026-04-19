import React from 'react';

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
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Posts</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {posts.map((post, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-56 rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-shadow"
          >
            <div className="aspect-square overflow-hidden bg-gray-50">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <p className="text-xs font-medium text-gray-800 leading-snug mb-2">{post.title}</p>
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[10px] text-gray-400">
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