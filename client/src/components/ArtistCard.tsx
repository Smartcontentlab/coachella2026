// ArtistCard — Cinematic Desert Dusk design
// Film-credit style card with video thumbnails on hover

import { useState } from 'react';
import { Play, Users, Clock } from 'lucide-react';
import type { Artist } from '@/lib/data';
import VideoModal from './VideoModal';

interface ArtistCardProps {
  artist: Artist;
  mode: 'w1' | 'w2';
}

export default function ArtistCard({ artist, mode }: ArtistCardProps) {
  const [selectedVideo, setSelectedVideo] = useState<{ videoId: string; title: string } | null>(null);

  const videos = mode === 'w1' ? (artist.w1Videos || []) : (artist.w2PreviewVideos || []);
  const hasVideos = videos.length > 0;
  const stageColorMap: Record<string, { bg: string; text: string }> = {
    'Coachella Stage': { bg: 'bg-amber-500/20', text: 'text-amber-300' },
    'Outdoor Theatre': { bg: 'bg-emerald-500/20', text: 'text-emerald-300' },
    'Sahara':          { bg: 'bg-rose-500/20',    text: 'text-rose-300' },
    'Mojave':          { bg: 'bg-violet-500/20',  text: 'text-violet-300' },
    'Gobi':            { bg: 'bg-orange-500/20',  text: 'text-orange-300' },
    'Sonora':          { bg: 'bg-teal-500/20',    text: 'text-teal-300' },
    'Yuma':            { bg: 'bg-blue-500/20',    text: 'text-blue-300' },
    'Quasar':          { bg: 'bg-purple-500/20',  text: 'text-purple-300' },
  };
  const sc = stageColorMap[artist.stage] || { bg: 'bg-white/10', text: 'text-white/60' };

  const thumbnailId = videos[0]?.videoId;

  return (
    <>
      <div
        className={`group relative rounded-lg overflow-hidden card-lift cursor-pointer border transition-all duration-300 ${
          artist.isHeadliner
            ? 'border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent'
            : 'border-white/8 bg-white/4'
        }`}
        style={{ background: artist.isHeadliner ? undefined : 'oklch(0.16 0.018 45)' }}
      >
        {/* Thumbnail / Background */}
        {thumbnailId && (
          <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' }}>
            <img
              src={`https://img.youtube.com/vi/${thumbnailId}/mqdefault.jpg`}
              alt={artist.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {/* Play overlay */}
            {hasVideos && (
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => setSelectedVideo({ videoId: videos[0].videoId, title: videos[0].title })}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-amber-500/90 shadow-lg shadow-amber-500/40 hover:bg-amber-400 transition-colors">
                  <Play size={22} className="text-black ml-1" fill="black" />
                </div>
              </div>
            )}
            {/* Video count badge */}
            {videos.length > 1 && (
              <div className="absolute top-2 right-2 bg-black/70 text-white/90 text-xs px-2 py-0.5 rounded-full font-medium">
                {videos.length} clips
              </div>
            )}
          </div>
        )}

        {/* No thumbnail placeholder */}
        {!thumbnailId && (
          <div
            className="flex items-center justify-center"
            style={{ height: '120px', background: 'oklch(0.18 0.02 45)' }}
          >
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                <Play size={16} className="text-white/40" />
              </div>
              <p className="text-xs text-white/30">No video yet</p>
            </div>
          </div>
        )}

        {/* Info strip */}
        <div className="p-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              {artist.isHeadliner && (
                <span className="headliner-tag text-xs px-2 py-0.5 rounded-full font-semibold mb-1 inline-block">
                  HEADLINER
                </span>
              )}
              <h3
                className={`font-bold leading-tight truncate ${
                  artist.isHeadliner ? 'text-amber-200 text-base' : 'text-white/90 text-sm'
                }`}
                style={{ fontFamily: artist.isHeadliner ? "'Playfair Display', serif" : "'Outfit', sans-serif" }}
              >
                {artist.name}
              </h3>
            </div>
            {artist.setTime && (
              <div className="flex items-center gap-1 text-white/40 text-xs flex-shrink-0">
                <Clock size={10} />
                <span>{artist.setTime}</span>
              </div>
            )}
          </div>

          {/* Stage + Genre badges */}
          <div className="flex flex-wrap gap-1 mb-2">
            <span className={`${sc.bg} ${sc.text} text-xs px-2 py-0.5 rounded-full font-medium`}>
              {artist.stage === 'Coachella Stage' ? 'Main Stage' : artist.stage}
            </span>
            {artist.genre && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/8 text-white/50 border border-white/10">
                {artist.genre}
              </span>
            )}
          </div>

          {/* Guest appearances */}
          {artist.guestAppearances && artist.guestAppearances.length > 0 && (
            <div className="flex items-start gap-1 mb-2">
              <Users size={10} className="text-rose-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-rose-300/80 leading-tight">
                w/ {artist.guestAppearances.slice(0, 3).join(', ')}
                {artist.guestAppearances.length > 3 && ` +${artist.guestAppearances.length - 3} more`}
              </p>
            </div>
          )}

          {/* Video list */}
          {hasVideos && (
            <div className="space-y-1 mt-2 border-t border-white/8 pt-2">
              {videos.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedVideo({ videoId: v.videoId, title: v.title })}
                  className="w-full flex items-center gap-2 text-left group/btn hover:bg-white/5 rounded px-1 py-0.5 transition-colors"
                >
                  <Play size={10} className="text-amber-400 flex-shrink-0 group-hover/btn:text-amber-300" />
                  <span className="text-xs text-white/60 group-hover/btn:text-white/90 transition-colors truncate leading-tight">
                    {v.title}
                  </span>
                  {(v as any).note && (
                    <span className="text-xs text-white/30 italic truncate hidden sm:block">— {(v as any).note}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedVideo && (
        <VideoModal
          videoId={selectedVideo.videoId}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
}
