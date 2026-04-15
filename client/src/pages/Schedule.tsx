// Schedule Planner — Weekend 2 Personal Schedule
// Design: Cinematic Desert Dusk — mobile-first
// Features: Browse by day, add/remove artists, conflict detection, My Schedule view

import { useState, useMemo } from 'react';
import { Plus, Minus, AlertTriangle, Clock, MapPin, Play, X, Calendar, ChevronLeft, Trash2, Download, Share2, CheckCircle2, Filter } from 'lucide-react';
import { useSchedule } from '@/contexts/ScheduleContext';
import VideoModal from '@/components/VideoModal';
import {
  w2Schedule,
  stages,
  stageColorMap,
  stageShortNames,
  dayLabels,
  hasConflict,
  getConflicts,
  formatTime,
  type ScheduleArtist,
  type Day,
  type Stage,
} from '@/lib/scheduleData';
import { useLocation } from 'wouter';

type ViewMode = 'browse' | 'my-schedule';

export default function Schedule() {
  const [, navigate] = useLocation();
  const { savedArtists, addArtist, removeArtist, isAdded, clearAll, count } = useSchedule();
  const [activeDay, setActiveDay] = useState<Day>('friday');
  const [activeStage, setActiveStage] = useState<Stage | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('browse');
  const [selectedVideo, setSelectedVideo] = useState<{ videoId: string; title: string } | null>(null);
  const [expandedArtist, setExpandedArtist] = useState<string | null>(null);

  const days: Day[] = ['friday', 'saturday', 'sunday'];

  // Artists for current day/stage filter
  const browseArtists = useMemo(() => {
    return w2Schedule
      .filter(a => a.day === activeDay && (activeStage === 'all' || a.stage === activeStage))
      .sort((a, b) => a.startMinutes - b.startMinutes);
  }, [activeDay, activeStage]);

  // My schedule grouped by day
  const myScheduleByDay = useMemo(() => {
    const grouped: Record<Day, ScheduleArtist[]> = { friday: [], saturday: [], sunday: [] };
    savedArtists.forEach(a => grouped[a.day].push(a));
    Object.values(grouped).forEach(arr => arr.sort((a, b) => a.startMinutes - b.startMinutes));
    return grouped;
  }, [savedArtists]);

  // Conflict detection for my schedule
  const conflictIds = useMemo(() => {
    const ids = new Set<string>();
    savedArtists.forEach(a => {
      const conflicts = getConflicts(a, savedArtists);
      if (conflicts.length > 0) ids.add(a.id);
    });
    return ids;
  }, [savedArtists]);

  const totalConflicts = conflictIds.size / 2;

  const handleToggle = (artist: ScheduleArtist) => {
    if (isAdded(artist.id)) {
      removeArtist(artist.id);
    } else {
      addArtist(artist);
    }
  };

  const handleShare = () => {
    const text = savedArtists.map(a => `${dayLabels[a.day].short}: ${a.name} @ ${a.stage} (${formatTime(a.startTime)})`).join('\n');
    if (navigator.share) {
      navigator.share({ title: 'My Coachella 2026 W2 Schedule', text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Schedule copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: 'oklch(0.12 0.015 45)' }}>
      {/* ── HEADER ── */}
      <div className="sticky top-0 z-30 border-b border-white/10" style={{ background: 'oklch(0.10 0.012 45 / 0.97)', backdropFilter: 'blur(16px)' }}>
        <div className="flex items-center gap-3 px-4 h-14">
          <button
            onClick={() => navigate('/')}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/8 hover:bg-white/15 transition-colors flex-shrink-0"
          >
            <ChevronLeft size={16} className="text-white" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-bold text-base leading-tight truncate" style={{ fontFamily: "'Outfit', sans-serif" }}>
              My W2 Schedule
            </h1>
            <p className="text-white/40 text-xs">April 17–19, 2026</p>
          </div>
          {/* Tab switcher */}
          <div className="flex items-center bg-white/8 rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => setViewMode('browse')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${viewMode === 'browse' ? 'bg-amber-500 text-black' : 'text-white/60 hover:text-white'}`}
            >
              Browse
            </button>
            <button
              onClick={() => setViewMode('my-schedule')}
              className={`relative px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${viewMode === 'my-schedule' ? 'bg-amber-500 text-black' : 'text-white/60 hover:text-white'}`}
            >
              My Plan
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Day tabs — only in browse mode */}
        {viewMode === 'browse' && (
          <div className="flex border-t border-white/8">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 ${
                  activeDay === day
                    ? 'text-amber-300 border-amber-500'
                    : 'text-white/40 border-transparent hover:text-white/70'
                }`}
              >
                <span className="block">{dayLabels[day].short}</span>
                <span className="block text-[10px] font-normal opacity-70">{dayLabels[day].date}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── BROWSE MODE ── */}
      {viewMode === 'browse' && (
        <div className="px-4 pt-4">
          {/* Stage filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none mb-4">
            <button
              onClick={() => setActiveStage('all')}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeStage === 'all'
                  ? 'bg-white/15 text-white border-white/30'
                  : 'text-white/40 border-white/10 hover:text-white/70'
              }`}
            >
              All Stages
            </button>
            {stages.map(stage => {
              const colors = stageColorMap[stage];
              const isActive = activeStage === stage;
              return (
                <button
                  key={stage}
                  onClick={() => setActiveStage(stage)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    isActive ? `${colors.bg} ${colors.text} ${colors.border}` : 'text-white/40 border-white/10 hover:text-white/70'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: colors.dot }}
                  />
                  {stageShortNames[stage]}
                </button>
              );
            })}
          </div>

          {/* Artist list */}
          <div className="space-y-2">
            {browseArtists.length === 0 && (
              <div className="text-center py-12 text-white/30">
                <Calendar size={32} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">No artists found for this filter</p>
              </div>
            )}
            {browseArtists.map(artist => {
              const added = isAdded(artist.id);
              const stageColors = stageColorMap[artist.stage];
              const isExpanded = expandedArtist === artist.id;
              const conflictsWithSaved = added ? getConflicts(artist, savedArtists) : [];
              const wouldConflict = !added ? savedArtists.filter(s => hasConflict(artist, s)) : [];

              return (
                <div
                  key={artist.id}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    added
                      ? 'border-amber-500/40 bg-amber-500/8'
                      : conflictsWithSaved.length > 0
                      ? 'border-red-500/30 bg-red-500/5'
                      : 'border-white/8 bg-white/3'
                  }`}
                >
                  {/* Main row */}
                  <div
                    className="flex items-center gap-3 p-3 cursor-pointer"
                    onClick={() => setExpandedArtist(isExpanded ? null : artist.id)}
                  >
                    {/* Time column */}
                    <div className="flex-shrink-0 text-center w-14">
                      <p className="text-white/80 text-xs font-bold">{formatTime(artist.startTime)}</p>
                      <p className="text-white/30 text-[10px]">{formatTime(artist.endTime)}</p>
                    </div>

                    {/* Artist info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        {artist.isHeadliner && (
                          <span className="text-[9px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 rounded-full">
                            HEADLINER
                          </span>
                        )}
                        {wouldConflict.length > 0 && (
                          <span className="text-[9px] font-bold text-orange-400 bg-orange-500/15 border border-orange-500/30 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                            <AlertTriangle size={8} />
                            CONFLICT
                          </span>
                        )}
                      </div>
                      <p className={`font-bold text-sm leading-tight truncate ${added ? 'text-amber-200' : 'text-white/90'}`}>
                        {artist.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${stageColors.bg} ${stageColors.text}`}>
                          {stageShortNames[artist.stage]}
                        </span>
                        {artist.genre && (
                          <span className="text-[10px] text-white/40 truncate">{artist.genre}</span>
                        )}
                      </div>
                    </div>

                    {/* Add/Remove button */}
                    <button
                      onClick={e => { e.stopPropagation(); handleToggle(artist); }}
                      className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                        added
                          ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/30'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      {added ? <CheckCircle2 size={16} /> : <Plus size={16} />}
                    </button>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-3 pb-3 border-t border-white/8 pt-3 space-y-3">
                      {artist.description && (
                        <p className="text-white/60 text-xs leading-relaxed">{artist.description}</p>
                      )}
                      {/* Conflict warnings */}
                      {wouldConflict.length > 0 && (
                        <div className="rounded-lg bg-orange-500/10 border border-orange-500/20 p-2.5">
                          <div className="flex items-center gap-1.5 mb-1">
                            <AlertTriangle size={12} className="text-orange-400" />
                            <p className="text-orange-300 text-xs font-semibold">Time Conflict</p>
                          </div>
                          {wouldConflict.map(c => (
                            <p key={c.id} className="text-orange-200/70 text-xs">
                              Overlaps with <strong>{c.name}</strong> ({formatTime(c.startTime)}–{formatTime(c.endTime)})
                            </p>
                          ))}
                        </div>
                      )}
                      {/* Preview video */}
                      {artist.previewVideoId && (
                        <button
                          onClick={() => setSelectedVideo({ videoId: artist.previewVideoId!, title: `${artist.name} — Preview` })}
                          className="w-full flex items-center gap-2 bg-white/8 hover:bg-white/12 rounded-lg px-3 py-2 transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                            <Play size={10} className="text-amber-400 ml-0.5" fill="currentColor" />
                          </div>
                          <span className="text-white/70 text-xs">Watch preview performance</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── MY SCHEDULE MODE ── */}
      {viewMode === 'my-schedule' && (
        <div className="px-4 pt-4">
          {savedArtists.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Calendar size={28} className="text-white/30" />
              </div>
              <h3 className="text-white/70 font-semibold mb-2">Your schedule is empty</h3>
              <p className="text-white/40 text-sm mb-6 max-w-xs mx-auto">
                Switch to Browse mode and tap the + button to add artists you want to see.
              </p>
              <button
                onClick={() => setViewMode('browse')}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg text-sm transition-colors"
              >
                Browse Artists
              </button>
            </div>
          ) : (
            <>
              {/* Summary bar */}
              <div className="rounded-xl border border-white/10 p-4 mb-5" style={{ background: 'oklch(0.15 0.016 45)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-white font-bold text-lg">{count} artists</p>
                    <p className="text-white/40 text-xs">saved to your schedule</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleShare}
                      className="w-9 h-9 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors"
                      title="Share schedule"
                    >
                      <Share2 size={15} className="text-white/70" />
                    </button>
                    <button
                      onClick={clearAll}
                      className="w-9 h-9 rounded-lg bg-red-500/15 hover:bg-red-500/25 flex items-center justify-center transition-colors"
                      title="Clear all"
                    >
                      <Trash2 size={15} className="text-red-400" />
                    </button>
                  </div>
                </div>
                {conflictIds.size > 0 && (
                  <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2">
                    <AlertTriangle size={14} className="text-orange-400 flex-shrink-0" />
                    <p className="text-orange-300 text-xs">
                      <strong>{conflictIds.size}</strong> artists have overlapping set times
                    </p>
                  </div>
                )}
              </div>

              {/* Schedule by day */}
              {days.map(day => {
                const dayArtists = myScheduleByDay[day];
                if (dayArtists.length === 0) return null;
                return (
                  <div key={day} className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        day === 'friday' ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' :
                        day === 'saturday' ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' :
                        'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      }`}>
                        {dayLabels[day].long} · {dayLabels[day].date}
                      </div>
                      <div className="flex-1 h-px bg-white/8" />
                      <span className="text-white/30 text-xs">{dayArtists.length} sets</span>
                    </div>

                    {/* Timeline */}
                    <div className="relative pl-4 border-l border-white/10 space-y-2">
                      {dayArtists.map((artist, idx) => {
                        const hasConflictFlag = conflictIds.has(artist.id);
                        const stageColors = stageColorMap[artist.stage];
                        return (
                          <div key={artist.id} className="relative">
                            {/* Timeline dot */}
                            <div
                              className="absolute -left-[17px] top-3.5 w-2.5 h-2.5 rounded-full border-2 border-current"
                              style={{ color: stageColors.dot, background: hasConflictFlag ? '#F97316' : stageColors.dot }}
                            />
                            <div
                              className={`rounded-xl border p-3 transition-all ${
                                hasConflictFlag
                                  ? 'border-orange-500/30 bg-orange-500/8'
                                  : artist.isHeadliner
                                  ? 'border-amber-500/30 bg-amber-500/8'
                                  : 'border-white/8 bg-white/3'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 text-center w-12">
                                  <p className="text-white/70 text-xs font-bold">{formatTime(artist.startTime)}</p>
                                  <p className="text-white/30 text-[10px]">{formatTime(artist.endTime)}</p>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`font-bold text-sm truncate ${artist.isHeadliner ? 'text-amber-200' : 'text-white/90'}`}>
                                    {artist.name}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${stageColors.bg} ${stageColors.text}`}>
                                      {stageShortNames[artist.stage]}
                                    </span>
                                    {hasConflictFlag && (
                                      <span className="flex items-center gap-0.5 text-[10px] text-orange-400">
                                        <AlertTriangle size={9} />
                                        Conflict
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-1.5 flex-shrink-0">
                                  {artist.previewVideoId && (
                                    <button
                                      onClick={() => setSelectedVideo({ videoId: artist.previewVideoId!, title: `${artist.name} — Preview` })}
                                      className="w-7 h-7 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 flex items-center justify-center transition-colors"
                                    >
                                      <Play size={11} className="text-amber-400 ml-0.5" fill="currentColor" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => removeArtist(artist.id)}
                                    className="w-7 h-7 rounded-lg bg-white/8 hover:bg-red-500/20 flex items-center justify-center transition-colors group"
                                  >
                                    <X size={11} className="text-white/40 group-hover:text-red-400 transition-colors" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {/* ── FLOATING ADD MORE BUTTON (My Schedule mode) ── */}
      {viewMode === 'my-schedule' && savedArtists.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={() => setViewMode('browse')}
            className="flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full shadow-xl shadow-amber-500/30 transition-all"
          >
            <Plus size={16} />
            Add More Artists
          </button>
        </div>
      )}

      {/* Video modal */}
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
