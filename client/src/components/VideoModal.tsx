// VideoModal — Cinematic Desert Dusk design
// Opens a YouTube embed in a full-screen modal with blur backdrop

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  videoId: string;
  title: string;
  onClose: () => void;
}

export default function VideoModal({ videoId, title, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl"
        style={{ background: 'oklch(0.10 0.012 45)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <p className="text-sm font-medium text-white/80 truncate pr-4">{title}</p>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={16} className="text-white" />
          </button>
        </div>
        {/* Video */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
