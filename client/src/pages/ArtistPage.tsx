// ArtistPage — Individual artist detail page
// Design: Cinematic Desert Dusk — cute, user-friendly
// Features: Social links, videos, schedule, YouTube comments

import { useState, useMemo } from 'react';
import { ChevronLeft, Play, Clock, Star, Calendar, Plus, CheckCircle2, AlertTriangle, MessageCircle, Heart, Share2, ExternalLink } from 'lucide-react';
import { useLocation, useParams } from 'wouter';
import { allArtists } from '@/lib/data';
import { w2Schedule, stageColorMap, stageShortNames, formatTime, getConflicts } from '@/lib/scheduleData';
import { useSchedule } from '@/contexts/ScheduleContext';
import { artistSocials } from '@/lib/socialData';
import SocialLinks from '@/components/SocialLinks';
import VideoModal from '@/components/VideoModal';
import { toast } from 'sonner';

export default function ArtistPage() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { addArtist, removeArtist, isAdded, savedArtists } = useSchedule();
  const [selectedVideo, setSelectedVideo] = useState<{ videoId: string; title: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'w1' | 'w2' | 'about'>('w1');
  const [liked, setLiked] = useState(false);

  const artist = useMemo(() => allArtists.find(a => a.id === params.id), [params.id]);
  const w2Entry = useMemo(() => {
    if (!artist) return null;
    return w2Schedule.find(a => a.name.toLowerCase() === artist.name.toLowerCase());
  }, [artist]);

  const socials = useMemo(() => {
    if (!params.id) return {};
    return artistSocials[params.id] || {};
  }, [params.id]);

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'oklch(0.12 0.015 45)' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🎵</div>
          <p className="text-white/50 mb-4 text-lg">Artist not found</p>
          <button onClick={() => navigate('/')} className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center gap-1 mx-auto">
            <ChevronLeft size={14} /> Back to lineup
          </button>
        </div>
      </div>
    );
  }

  const w1Videos = artist.w1Videos || [];
  const w2Videos = artist.w2PreviewVideos || [];
  const activeVideos = activeTab === 'w1' ? w1Videos : w2Videos;

  const added = w2Entry ? isAdded(w2Entry.id) : false;
  const conflicts = w2Entry ? getConflicts(w2Entry, savedArtists) : [];
  const thumbnailId = w1Videos[0]?.videoId || w2Videos[0]?.videoId;

  const dayColorMap = {
    friday: { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
    saturday: { bg: 'bg-rose-500/15', text: 'text-rose-300', border: 'border-rose-500/30', glow: 'shadow-rose-500/20' },
    sunday: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
  };
  const dayColors = dayColorMap[artist.day];

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: `${artist.name} at Coachella 2026`, url });
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard! 🎉');
    }
  };

  const hasTabs = w1Videos.length > 0 && w2Videos.length > 0;

  return (
    <div className="min-h-screen pb-20" style={{ background: 'oklch(0.12 0.015 45)' }}>
      <style>{`
        @keyframes heartPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        .heart-pop { animation: heartPop 0.3s ease; }
        .video-card:hover .play-overlay { opacity: 1; }
        .video-card:hover img { transform: scale(1.05); }
        .video-card img { transition: transform 0.4s ease; }
        .play-overlay { transition: opacity 0.2s ease; }
      `}</style>

      {/* ── HERO ── */}
      <div className="relative">
        {thumbnailId ? (
          <div className="relative h-72 sm:h-96 overflow-hidden">
            <img
              src={`https://img.youtube.com/vi/${thumbnailId}/maxresdefault.jpg`}
              alt={artist.name}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.7)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            {/* Decorative grain */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")" }} />
          </div>
        ) : (
          <div className="h-52 bg-gradient-to-br from-amber-900/30 via-black to-rose-900/20" />
        )}

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white/80 hover:text-white px-3 py-2 rounded-xl text-sm font-medium transition-all border border-white/10 hover:bg-black/70"
        >
          <ChevronLeft size={14} />
          Back
        </button>

        {/* Action buttons top-right */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => { setLiked(l => !l); if (!liked) toast.success(`Added ${artist.name} to favorites! 💛`); }}
            className={`w-9 h-9 rounded-xl backdrop-blur-md border flex items-center justify-center transition-all ${liked ? 'bg-rose-500/30 border-rose-500/40' : 'bg-black/50 border-white/10 hover:bg-black/70'}`}
          >
            <Heart size={15} className={liked ? 'text-rose-400 heart-pop' : 'text-white/60'} fill={liked ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/70 flex items-center justify-center transition-all"
          >
            <Share2 size={15} className="text-white/60 hover:text-white" />
          </button>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {artist.isHeadliner && (
            <div className="flex items-center gap-1.5 mb-2">
              <Star size={12} className="text-amber-400" fill="currentColor" />
              <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Headliner</span>
            </div>
          )}
          <h1 className="text-white font-black leading-tight mb-2.5" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 7vw, 3.5rem)' }}>
            {artist.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${dayColors.bg} ${dayColors.text} ${dayColors.border}`}>
              {artist.day.charAt(0).toUpperCase() + artist.day.slice(1)}
            </span>
            {artist.stage && (
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${stageColorMap[artist.stage as keyof typeof stageColorMap]?.bg || 'bg-white/10'} ${stageColorMap[artist.stage as keyof typeof stageColorMap]?.text || 'text-white/70'}`}>
                {artist.stage}
              </span>
            )}
            {artist.genre && (
              <span className="text-xs text-white/50 bg-white/8 px-2.5 py-1 rounded-full border border-white/10">{artist.genre}</span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-5 max-w-2xl mx-auto">

        {/* ── SOCIAL MEDIA LINKS ── */}
        {Object.keys(socials).length > 0 && (
          <div className="rounded-2xl border border-white/8 p-4" style={{ background: 'oklch(0.15 0.016 45)' }}>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Follow {artist.name}</p>
            <SocialLinks links={socials} size="md" showLabels={true} />
          </div>
        )}

        {/* ── W2 SET TIME + ADD TO PLAN ── */}
        <div className={`rounded-2xl border p-4 ${added ? 'border-amber-500/30 bg-amber-500/8' : 'border-white/8'}`} style={!added ? { background: 'oklch(0.15 0.016 45)' } : {}}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1.5">Weekend 2 Set</p>
              {w2Entry ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-amber-400" />
                    <span className="text-white font-bold">
                      {formatTime(w2Entry.startTime)} – {formatTime(w2Entry.endTime)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stageColorMap[w2Entry.stage]?.bg} ${stageColorMap[w2Entry.stage]?.text}`}>
                      {stageShortNames[w2Entry.stage]}
                    </span>
                    <span className="text-white/30 text-xs">· April 17–19, 2026</span>
                  </div>
                </div>
              ) : (
                <p className="text-white/50 text-sm">Same schedule as Weekend 1</p>
              )}
              {conflicts.length > 0 && (
                <div className="flex items-center gap-1.5 mt-2 bg-orange-500/10 border border-orange-500/20 rounded-lg px-2.5 py-1.5">
                  <AlertTriangle size={11} className="text-orange-400 flex-shrink-0" />
                  <p className="text-orange-300 text-xs">
                    Overlaps with {conflicts.map(c => c.name).join(', ')}
                  </p>
                </div>
              )}
            </div>
            {w2Entry && (
              <button
                onClick={() => {
                  if (added) { removeArtist(w2Entry.id); toast('Removed from your plan', { icon: '👋' }); }
                  else { addArtist(w2Entry); toast.success('Added to your W2 plan! 🎉'); }
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex-shrink-0 shadow-lg ${
                  added
                    ? `bg-amber-500 text-black ${dayColors.glow}`
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                }`}
              >
                {added ? <CheckCircle2 size={15} /> : <Plus size={15} />}
                {added ? 'In My Plan ✓' : 'Add to Plan'}
              </button>
            )}
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="flex gap-1 p-1 rounded-xl border border-white/8" style={{ background: 'oklch(0.14 0.015 45)' }}>
          {w1Videos.length > 0 && (
            <button
              onClick={() => setActiveTab('w1')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'w1' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-white/40 hover:text-white/70'}`}
            >
              🎬 W1 Full Sets ({w1Videos.length})
            </button>
          )}
          {w2Videos.length > 0 && (
            <button
              onClick={() => setActiveTab('w2')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'w2' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-white/40 hover:text-white/70'}`}
            >
              👀 W2 Preview ({w2Videos.length})
            </button>
          )}
          <button
            onClick={() => setActiveTab('about')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'about' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'text-white/40 hover:text-white/70'}`}
          >
            ✨ About
          </button>
        </div>

        {/* ── VIDEO GRID ── */}
        {(activeTab === 'w1' || activeTab === 'w2') && (
          <div>
            {activeVideos.length === 0 ? (
              <div className="text-center py-10 rounded-2xl border border-white/8" style={{ background: 'oklch(0.15 0.016 45)' }}>
                <div className="text-4xl mb-3">🎵</div>
                <p className="text-white/40 text-sm">Videos coming soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeVideos.map((video, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVideo({ videoId: video.videoId, title: video.title })}
                    className="video-card group relative rounded-2xl overflow-hidden border border-white/8 hover:border-amber-500/40 transition-all duration-200 text-left"
                    style={{ background: 'oklch(0.15 0.016 45)' }}
                  >
                    <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                      <img
                        src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="play-overlay absolute inset-0 flex items-center justify-center opacity-0">
                        <div className="w-14 h-14 rounded-full bg-amber-500/90 flex items-center justify-center shadow-xl shadow-amber-500/40">
                          <Play size={20} className="text-black ml-1" fill="black" />
                        </div>
                      </div>
                      {i === 0 && activeTab === 'w1' && (
                        <div className="absolute top-2 left-2 bg-amber-500/90 text-black text-[9px] font-bold px-2 py-0.5 rounded-full">
                          FULL SET
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-white/85 text-sm font-semibold leading-snug line-clamp-2">{video.title}</p>
                      {(video as any).note && (
                        <p className="text-white/35 text-xs mt-1 italic">{(video as any).note}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* YouTube Comments Section */}
            {activeVideos.length > 0 && selectedVideo === null && (
              <div className="mt-5 rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'oklch(0.14 0.015 45)' }}>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
                  <MessageCircle size={15} className="text-amber-400" />
                  <p className="text-white/80 font-semibold text-sm">YouTube Comments</p>
                  <span className="text-white/30 text-xs ml-auto">Sign in with YouTube to comment</span>
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-400 text-xs font-bold">?</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-white/8 transition-colors"
                        onClick={() => {
                          if (activeVideos[0]) {
                            window.open(`https://www.youtube.com/watch?v=${activeVideos[0].videoId}`, '_blank');
                          }
                        }}
                      >
                        <span className="text-white/30 text-sm flex-1">Add a comment on YouTube...</span>
                        <ExternalLink size={12} className="text-white/20 flex-shrink-0" />
                      </div>
                      <p className="text-white/25 text-xs mt-1.5 px-1">
                        💬 Comments are hosted on YouTube. Click to open the video and comment directly.
                      </p>
                    </div>
                  </div>
                  {/* Embedded YouTube comments via link */}
                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideos[0].videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/20 text-red-300 text-sm font-semibold transition-colors"
                  >
                    <YouTubeIcon />
                    View & Comment on YouTube
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── ABOUT TAB ── */}
        {activeTab === 'about' && (
          <div className="space-y-4">
            {artist.description && (
              <div className="rounded-2xl border border-white/8 p-5" style={{ background: 'oklch(0.15 0.016 45)' }}>
                <p className="text-white/70 text-sm leading-relaxed">{artist.description}</p>
              </div>
            )}

            {/* Guest appearances */}
            {artist.guestAppearances && artist.guestAppearances.length > 0 && (
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/8 p-4">
                <p className="text-rose-300 font-bold text-sm mb-3">🎤 Guest Appearances at W1</p>
                <div className="flex flex-wrap gap-2">
                  {artist.guestAppearances.map(guest => (
                    <span key={guest} className="text-xs bg-rose-500/15 text-rose-200 border border-rose-500/20 px-3 py-1.5 rounded-full font-medium">
                      {guest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social links expanded */}
            {Object.keys(socials).length > 0 && (
              <div className="rounded-2xl border border-white/8 p-4" style={{ background: 'oklch(0.15 0.016 45)' }}>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Connect</p>
                <SocialLinks links={socials} size="lg" showLabels={true} />
              </div>
            )}

            {/* Fun fact / set info */}
            <div className="rounded-2xl border border-amber-500/15 bg-amber-500/6 p-4">
              <p className="text-amber-300 font-bold text-sm mb-2">🌵 Coachella 2026 Info</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wide mb-0.5">Day</p>
                  <p className="text-white/80 text-sm font-semibold capitalize">{artist.day}</p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wide mb-0.5">Stage</p>
                  <p className="text-white/80 text-sm font-semibold">{artist.stage}</p>
                </div>
                {artist.setTime && (
                  <div>
                    <p className="text-white/30 text-xs uppercase tracking-wide mb-0.5">Set Time</p>
                    <p className="text-white/80 text-sm font-semibold">{artist.setTime}</p>
                  </div>
                )}
                {artist.genre && (
                  <div>
                    <p className="text-white/30 text-xs uppercase tracking-wide mb-0.5">Genre</p>
                    <p className="text-white/80 text-sm font-semibold">{artist.genre}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── PLAN CTA ── */}
        <div className="rounded-2xl border border-amber-500/15 bg-amber-500/6 p-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-amber-300 font-bold text-sm mb-0.5">🗓️ Planning Weekend 2?</p>
            <p className="text-white/40 text-xs">Build your full schedule with conflict detection</p>
          </div>
          <button
            onClick={() => navigate('/schedule')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-colors flex-shrink-0 shadow-lg shadow-amber-500/20"
          >
            <Calendar size={14} />
            My Schedule
          </button>
        </div>
      </div>

      {selectedVideo && (
        <VideoModal
          videoId={selectedVideo.videoId}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}

// Inline YouTube icon for the comment section
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}
