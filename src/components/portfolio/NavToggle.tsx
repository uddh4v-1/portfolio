import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Avatar3D from './Avatar3D';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
    isActive
      ? 'bg-gray-100 dark:bg-white/10'
      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10'
  }`;

export default function NavToggle() {
  const location = useLocation();
  const isOnAbout = location.pathname === '/about';
  const [mobileOpen, setMobileOpen] = useState(false);

  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-background/80 backdrop-blur-xl backdrop-saturate-150 border-b border-gray-200/50 dark:border-white/10 shadow-sm shadow-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-14 md:h-16 flex items-center justify-between">
        <Avatar3D size={36} />

        <div className="hidden md:flex items-center gap-1">
          {isOnAbout ? (
            <NavLink to="/work" className={navLinkClass} style={({ isActive }) => isActive ? { color: 'var(--brand)' } : {}}>Home</NavLink>
          ) : (
            <NavLink to="/about" className={navLinkClass} style={({ isActive }) => isActive ? { color: 'var(--brand)' } : {}}>About me</NavLink>
          )}
          <a
            href="#"
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            Resume
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setDark(d => !d)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(open => !open)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-white/10 bg-white dark:bg-background shadow-sm">
          <div className="px-4 py-4 space-y-3">
            {isOnAbout ? (
              <NavLink to="/work" className={navLinkClass} style={({ isActive }) => isActive ? { color: 'var(--brand)' } : {}} onClick={() => setMobileOpen(false)}>Home</NavLink>
            ) : (
              <NavLink to="/about" className={navLinkClass} style={({ isActive }) => isActive ? { color: 'var(--brand)' } : {}} onClick={() => setMobileOpen(false)}>About me</NavLink>
            )}
            <a
              href="#"
              className="block px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Resume
            </a>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-white/10">
              <button
                onClick={() => setDark(d => !d)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
