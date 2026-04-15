// Navbar — Cinematic Desert Dusk design
// Enhanced: Search bar, schedule badge, mobile menu

import { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { useLocation } from 'wouter';
import { useSchedule } from '@/contexts/ScheduleContext';
import SearchBar from './SearchBar';

const navLinks = [
  { label: 'Weekend 1', href: '#weekend1' },
  { label: 'Weekend 2', href: '#weekend2' },
  { label: 'Full Lineup', href: '#lineup' },
  { label: 'Monetize', href: '#monetize' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, navigate] = useLocation();
  const { count } = useSchedule();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    // If we're not on home, navigate there first
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-xl border-b border-white/8 shadow-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center gap-3 h-16">
        {/* Logo */}
        <button
          onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 group flex-shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
            <span className="text-amber-400 font-bold text-xs">C</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-white font-bold text-sm tracking-wide">COACHELLA</span>
            <span className="text-amber-400 font-bold text-sm ml-1.5">2026</span>
          </div>
        </button>

        {/* Desktop search bar */}
        <div className="hidden lg:flex flex-1 max-w-xs">
          <SearchBar />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 ml-auto">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/8 rounded-lg transition-all duration-200 font-medium"
            >
              {link.label}
            </button>
          ))}
          {/* Schedule button */}
          <button
            onClick={() => navigate('/schedule')}
            className="relative flex items-center gap-1.5 ml-1 px-3 py-2 text-sm font-semibold text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 rounded-lg transition-all duration-200 border border-amber-500/25"
          >
            <Calendar size={14} />
            My W2 Plan
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <a
            href="https://www.coachella.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-black rounded-lg transition-colors"
          >
            Official Site
          </a>
        </nav>

        {/* Mobile: schedule badge + menu */}
        <div className="md:hidden flex items-center gap-2 ml-auto">
          <button
            onClick={() => navigate('/schedule')}
            className="relative flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/25 rounded-lg"
          >
            <Calendar size={13} />
            Plan
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/8 hover:bg-white/15 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} className="text-white" /> : <Menu size={18} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10">
          <div className="container py-4 flex flex-col gap-1">
            {/* Mobile search */}
            <div className="mb-2">
              <SearchBar />
            </div>
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => { handleNav(link.href); setMobileOpen(false); }}
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
