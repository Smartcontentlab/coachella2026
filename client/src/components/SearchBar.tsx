// SearchBar — Global search across all artists
// Design: Cinematic Desert Dusk

import { useState, useRef, useEffect } from 'react';
import { Search, X, Play } from 'lucide-react';
import { useLocation } from 'wouter';
import { allArtists } from '@/lib/data';
import { stageColorMap } from '@/lib/scheduleData';
import type { Stage } from '@/lib/scheduleData';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [, navigate] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length >= 2
    ? allArtists.filter(a =>
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        (a.genre || '').toLowerCase().includes(query.toLowerCase()) ||
        a.stage.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleSelect = (id: string) => {
    navigate(`/artist/${id}`);
    setQuery('');
    setFocused(false);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setQuery('');
        setFocused(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const dayColors = { friday: 'text-amber-400', saturday: 'text-rose-400', sunday: 'text-emerald-400' };

  return (
    <div className="relative w-full max-w-xl">
      <div className={`flex items-center gap-2 rounded-xl border transition-all duration-200 px-3.5 ${
        focused ? 'border-amber-500/50 bg-white/8 shadow-lg shadow-amber-500/10' : 'border-white/12 bg-white/5'
      }`}>
        <Search size={15} className={`flex-shrink-0 transition-colors ${focused ? 'text-amber-400' : 'text-white/40'}`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search artists, genres, stages…"
          className="flex-1 bg-transparent text-white/90 placeholder:text-white/30 text-sm py-2.5 outline-none"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        />
        {query ? (
          <button onClick={() => setQuery('')} className="text-white/40 hover:text-white/70 transition-colors">
            <X size={14} />
          </button>
        ) : (
          <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] text-white/20 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 font-mono">/</kbd>
        )}
      </div>

      {/* Dropdown results */}
      {focused && results.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/12 shadow-2xl overflow-hidden z-50"
          style={{ background: 'oklch(0.14 0.016 45)' }}
        >
          {results.map((artist, i) => {
            const thumbnail = artist.w1Videos?.[0]?.videoId || artist.w2PreviewVideos?.[0]?.videoId;
            const stageColor = stageColorMap[artist.stage as Stage];
            return (
              <button
                key={artist.id}
                onClick={() => handleSelect(artist.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/6 transition-colors text-left ${i > 0 ? 'border-t border-white/6' : ''}`}
              >
                {/* Thumbnail */}
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                  {thumbnail ? (
                    <img
                      src={`https://img.youtube.com/vi/${thumbnail}/default.jpg`}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play size={12} className="text-white/20" />
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 text-sm font-semibold truncate">{artist.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-[10px] font-medium ${dayColors[artist.day]}`}>
                      {artist.day.charAt(0).toUpperCase() + artist.day.slice(1)}
                    </span>
                    <span className="text-white/20 text-[10px]">·</span>
                    <span className={`text-[10px] ${stageColor?.text || 'text-white/50'}`}>{artist.stage}</span>
                    {artist.genre && (
                      <>
                        <span className="text-white/20 text-[10px]">·</span>
                        <span className="text-white/40 text-[10px] truncate">{artist.genre}</span>
                      </>
                    )}
                  </div>
                </div>
                {artist.isHeadliner && (
                  <span className="text-[9px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 rounded-full flex-shrink-0">
                    HEADLINER
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {focused && query.length >= 2 && results.length === 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/12 p-4 text-center z-50"
          style={{ background: 'oklch(0.14 0.016 45)' }}
        >
          <p className="text-white/40 text-sm">No artists found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
