import { useState } from 'react';
import { NavLink } from 'react-router';
import { Menu, X, Sun, ExternalLink } from 'lucide-react';
import Avatar3D from './Avatar3D';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
    isActive
      ? 'text-gray-900 bg-gray-100'
      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
  }`;

export default function NavToggle() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Avatar3D size={36} />

        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/about" className={navLinkClass}>
            About me
          </NavLink>
          <NavLink to="/work" className={navLinkClass}>
            Work
          </NavLink>
          <NavLink to="/plugins" className={navLinkClass}>
            Plugins
          </NavLink>
          <a
            href="#"
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Resume
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://linkedin.com/in/nishantbagmar"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            <Sun className="w-4 h-4" />
          </button>
        </div>

        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-sm">
          <div className="px-4 py-4 space-y-3">
            <NavLink to="/about" className={navLinkClass} onClick={() => setMobileOpen(false)}>
              About me
            </NavLink>
            <NavLink to="/work" className={navLinkClass} onClick={() => setMobileOpen(false)}>
              Work
            </NavLink>
            <NavLink to="/plugins" className={navLinkClass} onClick={() => setMobileOpen(false)}>
              Plugins
            </NavLink>
            <a
              href="#"
              className="block px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Resume
            </a>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <a
                href="https://linkedin.com/in/nishantbagmar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                <Sun className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
