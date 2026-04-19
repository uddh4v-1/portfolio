import React from 'react';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 min-h-screen">
      {/* Profile photo */}
      <div className="w-20 h-20 rounded-2xl overflow-hidden mb-5 shadow-md">
        <img
          src="https://media.base44.com/images/public/69e4d6fd3247f4b649ed641e/6da9223a0_generated_baad4790.png"
          alt="Nishant Bagmar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
        Nishant Bagmar
      </h1>

      {/* Bio */}
      <p className="text-base text-gray-500 leading-relaxed max-w-xl mb-8">
        Hey! I'm a Product Designer now at Myntra, crafting the future of fashion tech. With 3+ years of experience in health, finance, and AI.<br />
        I specialise in simplifying complex systems into seamless, high-impact products that millions love to use.
      </p>

      {/* CTA Button */}
      <a
        href="https://linkedin.com/in/nishantbagmar"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors"
      >
        <span className="text-base">🤝</span>
        Let's connect!
      </a>
    </section>
  );
}