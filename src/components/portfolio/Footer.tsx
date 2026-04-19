

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16">
      {/* Scrolling name ticker */}
      <div className="py-6 overflow-hidden border-b border-gray-100" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
        <div className="animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-5xl md:text-7xl font-bold text-gray-100 mx-8 flex-shrink-0 tracking-tight select-none whitespace-nowrap">
              UDDHAV POWAR
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
          Thanks for dropping by :)
        </h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
          If something here caught your eye, sparked a thought, or just felt right, feel free to reach out.
          Let's create what doesn't exist yet or make what does feel simpler.
        </p>
        <a
          href="https://linkedin.com/in/nishantbagmar"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors"
        >
          <span>🤝</span>
          Let's connect!
        </a>
      </div>

      {/* Bottom info */}
      <div className="border-t border-gray-100 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-400">
        <span>UDDHAV POWAR</span>
        <span>SOFTWARE DEVELOPER</span>
        <span>UDDH4V@GMAIL.COM</span>
        <span>PUNE, INDIA</span>
      </div>
    </footer>
  );
}