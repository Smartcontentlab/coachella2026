// LegalPage — Shared layout for all legal/policy pages
// Design: Cinematic Desert Dusk

import { ChevronLeft, ExternalLink } from 'lucide-react';
import { useLocation } from 'wouter';

interface Section {
  title: string;
  content: React.ReactNode;
}

interface LegalPageProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
}

export default function LegalPage({ title, subtitle, lastUpdated, sections }: LegalPageProps) {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen pb-16" style={{ background: 'oklch(0.12 0.015 45)' }}>
      {/* Header */}
      <div className="border-b border-white/8" style={{ background: 'oklch(0.14 0.016 45)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors mb-5"
          >
            <ChevronLeft size={15} />
            Back to Home
          </button>
          <div className="flex items-start gap-3">
            <div className="w-1 h-12 bg-amber-500 rounded-full flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-white font-black text-2xl sm:text-3xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {title}
              </h1>
              <p className="text-white/50 text-sm">{subtitle}</p>
              <p className="text-white/30 text-xs mt-1">Last updated: {lastUpdated}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {sections.map((section, i) => (
          <div key={i} className="rounded-2xl border border-white/8 p-6" style={{ background: 'oklch(0.14 0.016 45)' }}>
            <h2 className="text-white font-bold text-lg mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {section.title}
            </h2>
            <div className="text-white/65 text-sm leading-relaxed space-y-3">
              {section.content}
            </div>
          </div>
        ))}

        {/* Footer note */}
        <div className="rounded-xl border border-amber-500/15 bg-amber-500/5 p-4">
          <p className="text-white/40 text-xs leading-relaxed">
            This website is a fan-made guide and is not affiliated with, endorsed by, or sponsored by Coachella, Goldenvoice, AEG Presents, or any artists featured. All performance videos are embedded from the official{' '}
            <a href="https://www.youtube.com/@coachella" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-0.5">
              Coachella YouTube channel <ExternalLink size={10} />
            </a>
            {' '}and remain the property of their respective owners.
          </p>
        </div>
      </div>
    </div>
  );
}
