// Navbar — Cinematic Desert Dusk design
// Sticky top nav with amber accent and smooth scroll links

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Weekend 1', href: '#weekend1' },
  { label: 'Weekend 2', href: '#weekend2' },
  { label: 'Full Lineup', href: '#lineup' },
  { label: 'Monetize', href: '#monetize' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/8 shadow-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
            <span className="text-amber-400 font-bold text-xs">C</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>
              COACHELLA
            </span>
            <span className="text-amber-400 font-bold text-sm ml-1.5">2026</span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/8 rounded-lg transition-all duration-200 font-medium"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://www.coachella.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-black rounded-lg transition-colors"
          >
            Official Site
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/8 hover:bg-white/15 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={18} className="text-white" /> : <Menu size={18} className="text-white" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-left px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/8 rounded-lg transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://www.coachella.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-4 py-3 text-sm font-semibold bg-amber-500 text-black rounded-lg text-center"
            >
              Official Site
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
