// Home — Coachella 2026 Ultimate Guide
// Design: Cinematic Desert Dusk
// Enhanced: Search, Newsletter, Artist page links, Schedule CTA, scroll animations

import { useState, useEffect, useRef } from 'react';
import { Play, Calendar, MapPin, ChevronDown, Star, TrendingUp, DollarSign, Users, Eye, Zap, Globe, ShoppingBag, Mic2, ArrowRight, Clock } from 'lucide-react';
import { useLocation } from 'wouter';
import Navbar from '@/components/Navbar';
import ArtistCard from '@/components/ArtistCard';
import VideoModal from '@/components/VideoModal';
import SearchBar from '@/components/SearchBar';
import NewsletterSignup from '@/components/NewsletterSignup';
import { useSchedule } from '@/contexts/ScheduleContext';
import {
  allArtists,
  weekend2PreviewArtists,
  coachellaStageArtists,
  outdoorTheatreArtists,
  saharaArtists,
  mojaveArtists,
  gobiArtists,
  sonoraArtists,
  yumaArtists,
  dayLabels,
  type Day,
} from '@/lib/data';

const HERO_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663562205962/ezf5wS3Mep9mtLagEKxpKy/hero_coachella_main-X4YFp979iLizQiQRU9647r.webp';
const WEEKEND2_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663562205962/ezf5wS3Mep9mtLagEKxpKy/hero_weekend2-UCoxm3nRSQvNTnxQHjJzbH.webp';
const TEXTURE_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663562205962/ezf5wS3Mep9mtLagEKxpKy/desert_texture_bg-3AXibuHaeMYssw9Ric8Lj8.webp';

const allStageGroups = [
  { label: 'Coachella Stage', artists: coachellaStageArtists },
  { label: 'Outdoor Theatre', artists: outdoorTheatreArtists },
  { label: 'Sahara', artists: saharaArtists },
  { label: 'Mojave', artists: mojaveArtists },
  { label: 'Gobi', artists: gobiArtists },
  { label: 'Sonora', artists: sonoraArtists },
  { label: 'Yuma', artists: yumaArtists },
];

const monetizationStrategies = [
  {
    icon: <DollarSign size={22} className="text-amber-400" />,
    title: 'Google AdSense',
    description: 'Apply for Google AdSense to display contextual ads. Festival and music sites typically earn $3–$8 CPM. With 10,000 monthly visitors, expect $30–$80/month. Scale to 100K visitors for $300–$800/month.',
    steps: ['Sign up at adsense.google.com', 'Add the AdSense code to your site header', 'Place ad units in high-visibility areas (sidebar, between sections)', 'Optimize ad placement using AdSense experiments'],
    potential: '$30–$800+/month',
    color: 'border-amber-500/30',
  },
  {
    icon: <ShoppingBag size={22} className="text-rose-400" />,
    title: 'Affiliate Marketing',
    description: 'Earn commissions by linking to festival merchandise, music streaming services, and concert ticket platforms. Coachella merch, Spotify, Apple Music, and StubHub all have affiliate programs.',
    steps: ['Join Amazon Associates for festival gear/merch links', 'Apply to ShareASale or Impact for music/event affiliates', 'Add "Buy Tickets" buttons linking through your affiliate ID', 'Review festival merchandise and earn 4–8% commission'],
    potential: '$100–$2,000+/month',
    color: 'border-rose-500/30',
  },
  {
    icon: <Eye size={22} className="text-emerald-400" />,
    title: 'Sponsored Content',
    description: 'Once you build traffic, brands in the music, travel, and lifestyle space will pay for sponsored posts, reviews, and featured artist spotlights. Festival season is peak demand.',
    steps: ['Build a media kit showing your traffic stats and audience demographics', 'Reach out to music brands, festival gear companies, and travel apps', 'Charge $150–$500 per sponsored post initially', 'Grow to $1,000–$5,000 per post with a larger audience'],
    potential: '$150–$5,000/post',
    color: 'border-emerald-500/30',
  },
  {
    icon: <TrendingUp size={22} className="text-blue-400" />,
    title: 'SEO Traffic Monetization',
    description: 'Optimize for high-value search terms like "Coachella 2026 performances", "Coachella lineup 2026", and artist-specific queries. Festival content gets massive seasonal traffic spikes.',
    steps: ['Target long-tail keywords: "[Artist] Coachella 2026 full set"', 'Create individual artist pages for better SEO', 'Build backlinks from music blogs and Reddit communities', 'Submit your sitemap to Google Search Console'],
    potential: 'Drives all other revenue',
    color: 'border-blue-500/30',
  },
  {
    icon: <Users size={22} className="text-purple-400" />,
    title: 'Email Newsletter',
    description: 'Build an email list of Coachella fans and music lovers. Monetize through sponsored newsletters, affiliate links, and premium content. Email lists are your most valuable owned asset.',
    steps: ['Add a newsletter signup form (use Mailchimp or ConvertKit free tier)', 'Offer a free "Coachella 2026 Ultimate Guide PDF" as lead magnet', 'Send weekly music discovery emails with affiliate links', 'Sell newsletter sponsorships at $50–$200 per send'],
    potential: '$200–$3,000/month',
    color: 'border-purple-500/30',
  },
  {
    icon: <Zap size={22} className="text-yellow-400" />,
    title: 'Premium Content / Patreon',
    description: 'Offer exclusive content like extended setlists, behind-the-scenes analysis, and early access to Weekend 2 previews through a Patreon or membership model.',
    steps: ['Create a Patreon page at $3–$10/month tiers', 'Offer exclusive content: full setlists, artist interviews, festival tips', 'Build a Discord community for premium members', 'Cross-promote on social media to drive signups'],
    potential: '$500–$5,000+/month',
    color: 'border-yellow-500/30',
  },
  {
    icon: <Globe size={22} className="text-teal-400" />,
    title: 'Social Media Monetization',
    description: 'Repurpose your website content on TikTok, Instagram Reels, and YouTube Shorts. Festival content goes viral easily. Monetize through platform ad revenue and brand deals.',
    steps: ['Create short clips of performance highlights for TikTok/Reels', 'Apply for YouTube Partner Program (1,000 subscribers + 4,000 watch hours)', 'Use Instagram Creator Marketplace for brand deals', 'Cross-link your website in all social bios'],
    potential: '$200–$10,000+/month',
    color: 'border-teal-500/30',
  },
  {
    icon: <Mic2 size={22} className="text-orange-400" />,
    title: 'Sell the Website',
    description: 'A well-trafficked music/festival website can be sold for 24–36x monthly revenue on platforms like Flippa or Empire Flippers. Build traffic, monetize it, then sell for a lump sum.',
    steps: ['List on Flippa.com or Empire Flippers', 'Document all traffic sources, revenue streams, and growth trends', 'A site earning $1,000/month can sell for $24,000–$36,000', 'Grow traffic aggressively before listing to maximize valuation'],
    potential: '$5,000–$100,000+ (one-time)',
    color: 'border-orange-500/30',
  },
];

// Scroll reveal hook
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [activeDay, setActiveDay] = useState<Day>('friday');
  const [, navigate] = useLocation();
  const { count } = useSchedule();
  const heroRef = useRef<HTMLDivElement>(null);

  const days: { key: Day; label: string; shortLabel: string; color: string; activeBg: string }[] = [
    { key: 'friday',   label: 'Friday Apr 10',   shortLabel: 'Fri',  color: 'text-amber-300',   activeBg: 'bg-amber-500/15 border-amber-500 text-amber-300' },
    { key: 'saturday', label: 'Saturday Apr 11', shortLabel: 'Sat',  color: 'text-rose-300',    activeBg: 'bg-rose-500/15 border-rose-500 text-rose-300' },
    { key: 'sunday',   label: 'Sunday Apr 12',   shortLabel: 'Sun',  color: 'text-emerald-300', activeBg: 'bg-emerald-500/15 border-emerald-500 text-emerald-300' },
  ];

  const groupedByStage = allStageGroups.map(group => ({
    ...group,
    filtered: group.artists.filter(a => a.day === activeDay),
  })).filter(g => g.filtered.length > 0);

  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.12 0.015 45)' }}>
      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1.0) translate(0, 0); }
          100% { transform: scale(1.08) translate(-1%, -1%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up-1 { animation: fadeUp 0.8s ease 0.2s both; }
        .animate-fade-up-2 { animation: fadeUp 0.8s ease 0.4s both; }
        .animate-fade-up-3 { animation: fadeUp 0.8s ease 0.6s both; }
        .animate-fade-up-4 { animation: fadeUp 0.8s ease 0.8s both; }
        .animate-fade-up-5 { animation: fadeUp 0.8s ease 1.0s both; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .artist-card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .artist-card-hover:hover { transform: translateY(-3px); }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={heroRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})`, animation: 'kenBurns 22s ease-in-out infinite alternate' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

        <div className="relative z-10 container pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="animate-fade-up-1 inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300 text-sm font-semibold tracking-wide">APRIL 10–19, 2026 · INDIO, CALIFORNIA</span>
            </div>
            <h1 className="animate-fade-up-2 text-white leading-none mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900 }}>
              Coachella
              <br />
              <span className="text-amber-gradient">2026</span>
            </h1>
            <p className="animate-fade-up-3 text-white/70 text-lg mb-4 max-w-xl leading-relaxed">
              The ultimate guide to every performance. Watch full Weekend 1 sets, build your Weekend 2 schedule, and explore the complete lineup.
            </p>
            <div className="animate-fade-up-3 flex flex-wrap gap-2 mb-6">
              {['Sabrina Carpenter', 'Justin Bieber', 'Karol G', 'Anyma*'].map(name => (
                <span key={name} className="headliner-tag text-sm px-3 py-1 rounded-full font-semibold">{name}</span>
              ))}
              <span className="text-white/30 text-xs self-center">*canceled W1 due to weather</span>
            </div>
            {/* Search bar in hero */}
            <div className="animate-fade-up-4 mb-6 max-w-lg">
              <SearchBar />
            </div>
            <div className="animate-fade-up-5 flex flex-wrap gap-3">
              <button
                onClick={() => document.querySelector('#weekend1')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-all shadow-lg shadow-amber-500/30"
              >
                <Play size={16} fill="black" />
                Watch Weekend 1
              </button>
              <button
                onClick={() => navigate('/schedule')}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20"
              >
                <Calendar size={16} />
                Plan Weekend 2
                {count > 0 && (
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="border-y border-white/8" style={{ background: 'oklch(0.14 0.016 45)' }}>
        <div className="container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Artists', value: '100+', icon: <Mic2 size={15} className="text-amber-400" /> },
              { label: 'Stages', value: '7', icon: <MapPin size={15} className="text-rose-400" /> },
              { label: 'Weekends', value: '2', icon: <Calendar size={15} className="text-emerald-400" /> },
              { label: 'Performance Videos', value: '30+', icon: <Play size={15} className="text-blue-400" /> },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">{stat.icon}</div>
                <div>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCHEDULE PLANNER CTA BANNER ── */}
      <div className="border-b border-white/8" style={{ background: 'oklch(0.13 0.015 45)' }}>
        <div className="container py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/6 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                <Calendar size={18} className="text-amber-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Build Your Weekend 2 Schedule
                </h3>
                <p className="text-white/55 text-sm">
                  Browse all 50+ artists, add your favorites, and get instant conflict alerts when sets overlap.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/schedule')}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 flex-shrink-0"
            >
              Open Planner
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── WEEKEND 1 PERFORMANCES ── */}
      <section id="weekend1" className="py-20">
        <div className="container">
          <RevealSection>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-8 bg-amber-500 rounded-full" />
                <span className="text-amber-400 text-sm font-bold tracking-widest uppercase">Weekend One · April 10–12</span>
              </div>
              <h2 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
                Full Performances
              </h2>
              <p className="text-white/60 text-lg max-w-2xl">
                Watch every Weekend 1 set organized by day. Click any card to play the official Coachella YouTube performance.
              </p>
            </div>
          </RevealSection>

          {/* Day filter tabs */}
          <div className="flex gap-2 mb-10 overflow-x-auto scrollbar-none pb-1">
            {days.map(day => (
              <button
                key={day.key}
                onClick={() => setActiveDay(day.key)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                  activeDay === day.key ? day.activeBg : 'text-white/50 border-white/10 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                <span className="hidden sm:inline">{day.label}</span>
                <span className="sm:hidden">{day.shortLabel}</span>
              </button>
            ))}
          </div>

          {/* Stage groups */}
          <div className="space-y-14">
            {groupedByStage.map((group, gi) => (
              <RevealSection key={group.label} delay={gi * 80}>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-white/90 font-bold text-lg">{group.label}</h3>
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="text-white/30 text-sm">{group.filtered.length} acts</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {group.filtered.map(artist => (
                    <div
                      key={artist.id}
                      className="artist-card-hover"
                      onClick={() => navigate(`/artist/${artist.id}`)}
                    >
                      <ArtistCard artist={artist} mode="w1" />
                    </div>
                  ))}
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER SIGNUP ── */}
      <div className="py-8" style={{ background: 'oklch(0.13 0.015 45)' }}>
        <div className="container">
          <RevealSection>
            <NewsletterSignup variant="banner" />
          </RevealSection>
        </div>
      </div>

      {/* ── WEEKEND 2 PREVIEW ── */}
      <section id="weekend2" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${WEEKEND2_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="relative z-10 container">
          <RevealSection>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-8 bg-rose-500 rounded-full" />
                <span className="text-rose-400 text-sm font-bold tracking-widest uppercase">Weekend Two · April 17–19</span>
              </div>
              <h2 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
                Preview the Sets
              </h2>
              <p className="text-white/60 text-lg max-w-2xl">
                Watch Weekend 1 performances to know exactly what to expect. Plus Kacey Musgraves joins as a surprise addition.
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="mb-10 p-4 rounded-xl border border-rose-500/20 bg-rose-500/8 flex items-start gap-3">
              <Star size={18} className="text-rose-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-rose-300 font-semibold text-sm mb-1">Weekend 2 Additions & Changes</p>
                <p className="text-white/60 text-sm">
                  <strong className="text-white/80">Kacey Musgraves</strong> replaces Jack White at the Mojave tent on Saturday.
                  All other headliners and major acts return with the same setlists.
                  Anyma is expected to perform his full set after the weather cancellation in Weekend 1.
                </p>
              </div>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {weekend2PreviewArtists.map((artist, i) => (
              <RevealSection key={artist.id} delay={i * 50}>
                <div className="artist-card-hover" onClick={() => navigate(`/artist/${artist.id.replace('-w2', '')}`)}>
                  <ArtistCard artist={artist} mode="w2" />
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Plan your schedule CTA */}
          <RevealSection delay={200}>
            <div className="mt-12 text-center">
              <button
                onClick={() => navigate('/schedule')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-rose-500 hover:bg-rose-400 text-white font-bold text-base rounded-xl transition-all shadow-xl shadow-rose-500/25"
              >
                <Calendar size={18} />
                Build Your Weekend 2 Schedule
                <ArrowRight size={16} />
              </button>
              <p className="text-white/30 text-sm mt-3">Free · No account needed · Saves to your device</p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FULL LINEUP TABLE ── */}
      <section id="lineup" className="py-20">
        <div className="container">
          <RevealSection>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-8 bg-emerald-500 rounded-full" />
                <span className="text-emerald-400 text-sm font-bold tracking-widest uppercase">Complete Lineup</span>
              </div>
              <h2 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
                All Artists by Day & Stage
              </h2>
              <p className="text-white/60 text-lg max-w-2xl">Every artist performing at Coachella 2026, organized by day and stage.</p>
            </div>
          </RevealSection>

          {(['friday', 'saturday', 'sunday'] as Day[]).map(day => (
            <RevealSection key={day} delay={50}>
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider border ${
                    day === 'friday' ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' :
                    day === 'saturday' ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' :
                    'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  }`}>
                    {dayLabels[day]}
                  </div>
                  <div className="flex-1 h-px bg-white/8" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {allStageGroups.map(group => {
                    const dayArtists = group.artists.filter(a => a.day === day);
                    if (dayArtists.length === 0) return null;
                    return (
                      <div key={group.label} className="rounded-xl border border-white/8 overflow-hidden" style={{ background: 'oklch(0.15 0.016 45)' }}>
                        <div className="px-4 py-2.5 border-b border-white/8 bg-white/4">
                          <h4 className="text-white/80 font-bold text-sm">{group.label}</h4>
                        </div>
                        <div className="p-3 space-y-0.5">
                          {dayArtists.map(artist => (
                            <button
                              key={artist.id}
                              onClick={() => navigate(`/artist/${artist.id}`)}
                              className="w-full flex items-center justify-between gap-2 py-1.5 px-1 rounded-lg hover:bg-white/6 transition-colors group"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                {artist.isHeadliner && <Star size={10} className="text-amber-400 flex-shrink-0" fill="currentColor" />}
                                <span className={`text-sm truncate group-hover:text-amber-300 transition-colors ${artist.isHeadliner ? 'text-amber-200 font-semibold' : 'text-white/75'}`}>
                                  {artist.name}
                                </span>
                              </div>
                              {artist.setTime && <span className="text-xs text-white/30 flex-shrink-0">{artist.setTime}</span>}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── MONETIZATION GUIDE ── */}
      <section id="monetize" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${TEXTURE_IMG})` }} />
        <div className="absolute inset-0" style={{ background: 'oklch(0.10 0.012 45 / 0.92)' }} />
        <div className="relative z-10 container">
          <RevealSection>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-8 bg-yellow-500 rounded-full" />
                <span className="text-yellow-400 text-sm font-bold tracking-widest uppercase">Make Money</span>
              </div>
              <h2 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
                How to Monetize<br /><span className="text-amber-gradient">This Website</span>
              </h2>
              <p className="text-white/60 text-lg max-w-2xl">
                A complete playbook for turning festival traffic into real income — from day-one ad revenue to a five-figure exit.
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
              {[
                { label: 'Month 1 Potential', value: '$50–$200', note: 'Ads + Affiliates', color: 'text-amber-300' },
                { label: 'Month 3 Potential', value: '$300–$1K', note: 'With SEO growth', color: 'text-rose-300' },
                { label: 'Month 6 Potential', value: '$1K–$5K', note: 'Sponsored + Email', color: 'text-emerald-300' },
                { label: 'Exit Value', value: '$25K–$100K+', note: 'Sell on Flippa', color: 'text-yellow-300' },
              ].map(item => (
                <div key={item.label} className="rounded-xl border border-white/10 p-4 text-center" style={{ background: 'oklch(0.16 0.018 45)' }}>
                  <p className={`text-xl font-bold mb-1 ${item.color}`}>{item.value}</p>
                  <p className="text-white/80 text-xs font-semibold mb-0.5">{item.label}</p>
                  <p className="text-white/40 text-xs">{item.note}</p>
                </div>
              ))}
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monetizationStrategies.map((strategy, i) => (
              <RevealSection key={i} delay={i * 60}>
                <div className={`rounded-xl border p-6 h-full ${strategy.color}`} style={{ background: 'oklch(0.15 0.016 45)' }}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0">{strategy.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-base mb-1">{strategy.title}</h3>
                      <div className="inline-flex items-center gap-1 bg-white/8 rounded-full px-2.5 py-0.5">
                        <TrendingUp size={10} className="text-green-400" />
                        <span className="text-green-300 text-xs font-semibold">{strategy.potential}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mb-4 leading-relaxed">{strategy.description}</p>
                  <div className="space-y-2">
                    {strategy.steps.map((step, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span className="text-amber-500/60 text-xs font-bold mt-0.5 flex-shrink-0">{j + 1}.</span>
                        <p className="text-white/65 text-sm leading-snug">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={200}>
            <div className="mt-10 p-6 rounded-xl border border-amber-500/20 bg-amber-500/8">
              <div className="flex items-start gap-3">
                <Zap size={20} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-300 font-bold mb-2">Pro Strategy: The Festival Content Flywheel</p>
                  <p className="text-white/65 text-sm leading-relaxed">
                    The most effective approach is to combine <strong className="text-white/85">SEO + AdSense + Affiliate links</strong> from day one.
                    Coachella content peaks in April each year, so start building content in January–February.
                    Add an email signup form immediately — even 500 subscribers can generate $200–$500/month in newsletter sponsorships.
                    Once you hit 10,000 monthly visitors, apply for premium ad networks like <strong className="text-white/85">Mediavine</strong> (pays 3–5x more than AdSense).
                    After 12 months of documented revenue, list on <strong className="text-white/85">Flippa.com</strong> for a 24–36x monthly revenue multiple.
                  </p>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/8 py-12" style={{ background: 'oklch(0.10 0.012 45)' }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                  <span className="text-amber-400 font-bold text-xs">C</span>
                </div>
                <span className="text-white font-bold text-lg">COACHELLA 2026</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">The ultimate fan guide to every performance at the Empire Polo Club, Indio, California.</p>
            </div>
            {/* Quick links */}
            <div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-3">Quick Links</p>
              <div className="space-y-2">
                {[
                  { label: 'Weekend 1 Performances', href: '#weekend1' },
                  { label: 'Weekend 2 Preview', href: '#weekend2' },
                  { label: 'Full Lineup', href: '#lineup' },
                  { label: 'Monetization Guide', href: '#monetize' },
                ].map(link => (
                  <button
                    key={link.href}
                    onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="block text-white/50 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Newsletter footer */}
            <div>
              <NewsletterSignup variant="footer" />
            </div>
          </div>
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-sm text-white/30">
              <span>April 10–12 · Weekend 1</span>
              <span className="text-white/15">·</span>
              <span>April 17–19 · Weekend 2</span>
            </div>
            <a href="https://www.coachella.com" target="_blank" rel="noopener noreferrer" className="text-amber-400/60 hover:text-amber-400 text-sm transition-colors">
              Official Site ↗
            </a>
          </div>
          <p className="text-white/20 text-xs text-center mt-4">
            Fan-made guide. All performance videos are official Coachella YouTube content. Not affiliated with Goldenvoice or AEG Presents.
          </p>
        </div>
      </footer>

      {/* ── FLOATING SCHEDULE FAB (mobile) ── */}
      <div className="fixed bottom-6 right-4 z-30 sm:hidden">
        <button
          onClick={() => navigate('/schedule')}
          className="flex items-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-full shadow-xl shadow-amber-500/40 transition-all"
        >
          <Calendar size={16} />
          My W2 Plan
          {count > 0 && (
            <span className="w-5 h-5 rounded-full bg-black/30 text-white text-xs font-bold flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
