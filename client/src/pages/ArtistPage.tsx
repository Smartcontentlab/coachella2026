// ArtistPage — Individual artist detail page
// Design: Cinematic Desert Dusk
// Features: Full bio, all videos, schedule info, add to schedule CTA

import { useState, useMemo } from 'react';
import { ChevronLeft, Play, Clock, MapPin, Users, Star, Calendar, Plus, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useLocation, useParams } from 'wouter';
import { allArtists } from '@/lib/data';
import { w2Schedule, stageColorMap, stageShortNames, formatTime, getConflicts } from '@/lib/scheduleData';
import { useSchedule } from '@/contexts/ScheduleContext';
import VideoModal from '@/components/VideoModal';

export default function ArtistPage() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { addArtist, removeArtist, isAdded, savedArtists } = useSchedule();
  const [selectedVideo, setSelectedVideo] = useState<{ videoId: string; title: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'w1' | 'w2'>('w1');

  const artist = useMemo(() => allArtists.find(a => a.id === params.id), [params.id]);
  const w2Artist = useMemo(() => w2Schedule.find(a => a.id === `${params.id}-fri` || a.id === `${params.id}-sat` || a.id === `${params.id}-sun` || a.id.startsWith(params.id?.split('-')[0] || '')), [params.id]);

  // Try to find a matching w2 schedule entry by name
  const w2Entry = useMemo(() => {
    if (!artist) return null;
    return w2Schedule.find(a => a.name.toLowerCase() === artist.name.toLowerCase());
  }, [artist]);

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'oklch(0.12 0.015 45)' }}>
        <div className="text-center">
          <p className="text-white/50 mb-4">Artist not found</p>
          <button onClick={() => navigate('/')} className="text-amber-400 hover:text-amber-300 text-sm">
            ← Back to lineup
          </button>
        </div>
      </div>
    );
  }

  const w1Videos = artist.w1Videos || [];
  const w2Videos = artist.w2PreviewVideos || [];
  const allVideos = activeTab === 'w1' ? w1Videos : w2Videos;

  const added = w2Entry ? isAdded(w2Entry.id) : false;
  const conflicts = w2Entry ? getConflicts(w2Entry, savedArtists) : [];

  const thumbnailId = w1Videos[0]?.videoId || w2Videos[0]?.videoId;

  const dayColorMap = {
    friday: { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-500/30' },
    saturday: { bg: 'bg-rose-500/15', text: 'text-rose-300', border: 'border-rose-500/30' },
    sunday: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  };
  const dayColors = dayColorMap[artist.day];

  return (
    <div className="min-h-screen pb-16" style={{ background: 'oklch(0.12 0.015 45)' }}>
      {/* Hero */}
      <div className="relative">
        {thumbnailId ? (
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={`https://img.youtube.com/vi/${thumbnailId}/maxresdefault.jpg`}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-amber-900/30 to-black" />
        )}

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white/80 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10"
        >
          <ChevronLeft size={14} />
          Back
        </button>

        {/* Hero content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {artist.isHeadliner && (
            <div className="flex items-center gap-1.5 mb-2">
              <Star size={12} className="text-amber-400" fill="currentColor" />
              <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Headliner</span>
            </div>
          )}
          <h1 className="text-white font-black leading-tight mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 6vw, 3rem)' }}>
            {artist.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${dayColors.bg} ${dayColors.text} ${dayColors.border}`}>
              {artist.day.charAt(0).toUpperCase() + artist.day.slice(1)}
            </span>
            {artist.stage && (
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${stageColorMap[artist.stage as keyof typeof stageColorMap]?.bg || 'bg-white/10'} ${stageColorMap[artist.stage as keyof typeof stageColorMap]?.text || 'text-white/70'}`}>
                {artist.stage}
              </span>
            )}
            {artist.genre && (
              <span className="text-xs text-white/50 bg-white/8 px-2.5 py-1 rounded-full">{artist.genre}</span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-5">
        {/* Set time + Add to Schedule */}
        <div className="rounded-xl border border-white/10 p-4" style={{ background: 'oklch(0.15 0.016 45)' }}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-white/40 text-xs mb-1 uppercase tracking-wide">Weekend 2 Set Time</p>
              {w2Entry ? (
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-amber-400" />
                  <span className="text-white font-bold">
                    {formatTime(w2Entry.startTime)} – {formatTime(w2Entry.endTime)}
                  </span>
                  <span className="text-white/40 text-sm">·</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stageColorMap[w2Entry.stage]?.bg} ${stageColorMap[w2Entry.stage]?.text}`}>
                    {stageShortNames[w2Entry.stage]}
                  </span>
                </div>
              ) : (
                <p className="text-white/50 text-sm">Same as Weekend 1</p>
              )}
              {conflicts.length > 0 && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <AlertTriangle size={12} className="text-orange-400" />
                  <p className="text-orange-300 text-xs">
                    Conflicts with {conflicts.map(c => c.name).join(', ')}
                  </p>
                </div>
              )}
            </div>
            {w2Entry && (
              <button
                onClick={() => added ? removeArtist(w2Entry.id) : addArtist(w2Entry)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex-shrink-0 ${
                  added
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                }`}
              >
                {added ? <CheckCircle2 size={15} /> : <Plus size={15} />}
                {added ? 'In My Plan' : 'Add to Plan'}
              </button>
            )}
          </div>
        </div>

        {/* Description */}
        {artist.description && (
          <div>
            <p className="text-white/65 text-sm leading-relaxed">{artist.description}</p>
          </div>
        )}

        {/* Guest appearances */}
        {artist.guestAppearances && artist.guestAppearances.length > 0 && (
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/8 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users size={14} className="text-rose-400" />
              <p className="text-rose-300 font-semibold text-sm">Guest Appearances</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {artist.guestAppearances.map(guest => (
                <span key={guest} className="text-xs bg-rose-500/15 text-rose-200 border border-rose-500/20 px-2.5 py-1 rounded-full">
                  {guest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Videos section */}
        {(w1Videos.length > 0 || w2Videos.length > 0) && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>Performances</h2>
            </div>

            {/* Tab switcher */}
            {w1Videos.length > 0 && w2Videos.length > 0 && (
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('w1')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${activeTab === 'w1' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'text-white/50 border-white/10 hover:text-white/80'}`}
                >
                  Weekend 1 Full Sets ({w1Videos.length})
                </button>
                <button
                  onClick={() => setActiveTab('w2')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${activeTab === 'w2' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'text-white/50 border-white/10 hover:text-white/80'}`}
                >
                  W2 Preview ({w2Videos.length})
                </button>
              </div>
            )}

            {/* Video grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allVideos.map((video, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedVideo({ videoId: video.videoId, title: video.title })}
                  className="group relative rounded-xl overflow-hidden border border-white/8 hover:border-amber-500/40 transition-all duration-200"
                >
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-amber-500/90 flex items-center justify-center shadow-lg shadow-amber-500/40">
                        <Play size={18} className="text-black ml-0.5" fill="black" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 text-left">
                    <p className="text-white/85 text-sm font-medium leading-snug line-clamp-2">{video.title}</p>
                    {(video as any).note && (
                      <p className="text-white/35 text-xs mt-1 italic">{(video as any).note}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigate to schedule CTA */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/8 p-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-amber-300 font-semibold text-sm mb-0.5">Planning Weekend 2?</p>
            <p className="text-white/50 text-xs">Build your personal schedule with conflict detection</p>
          </div>
          <button
            onClick={() => navigate('/schedule')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-lg transition-colors flex-shrink-0"
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
