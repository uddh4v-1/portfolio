import React from 'react';

const tools = [
  { name: 'Figma', emoji: '🎨', bg: '#F5F5F5' },
  { name: 'Framer', emoji: '⚡', bg: '#F5F5F5' },
  { name: 'Cursor', emoji: '🖱️', bg: '#F5F5F5' },
  { name: "MCP's", emoji: '🔗', bg: '#F5F5F5' },
  { name: 'v0', emoji: '🤖', bg: '#F5F5F5' },
  { name: 'Lovable', emoji: '💜', bg: '#F5F5F5' },
];

export default function ToolStack() {
  const repeated = [...tools, ...tools, ...tools, ...tools];

  return (
    <section className="py-12 border-t border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">Tool Stack</h2>
      <div
        className="relative overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
      >
        <div className="animate-marquee">
          {repeated.map((tool, i) => (
            <div key={i} className="flex flex-col items-center gap-2 mx-10 flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl border border-gray-200">
                {tool.emoji}
              </div>
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}