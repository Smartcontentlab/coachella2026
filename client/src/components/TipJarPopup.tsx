// TipJarPopup Component — Reusable tip jar with popup modal
// Features: Cash App integration, QR code, viral sharing, and smooth animations

import { useState } from 'react';
import { Coffee, X, Copy, Check } from 'lucide-react';

interface TipJarPopupProps {
  cashAppId?: string;
  qrCodeUrl?: string;
  showOnLoad?: boolean;
}

export default function TipJarPopup({ 
  cashAppId = '$ChristopherGall6',
  qrCodeUrl = '/cashapp_qr.png',
  showOnLoad = false 
}: TipJarPopupProps) {
  const [isOpen, setIsOpen] = useState(showOnLoad);
  const [copied, setCopied] = useState(false);
  
  const cashAppUrl = `https://cash.app/${cashAppId}`;
  
  const handleCopyLink = () => {
    const shareText = `Watching Coachella 2026! 🌵 Check out the full schedule, live streams, and set times here: ${window.location.origin}`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Tip Jar Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        title="Support the Hub"
      >
        <Coffee size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div 
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-white/10 shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-white/10 p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} className="text-white/60 hover:text-white" />
              </button>
              
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/30 flex items-center justify-center">
                  <Coffee size={20} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Support the Hub</h3>
                  <p className="text-white/50 text-sm">Help us keep Coachella live!</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed">
                Love this live stream hub? Support the creator directly via Cash App and help us keep bringing you the best Coachella experience! 🌵
              </p>

              {/* QR Code Section */}
              <div className="flex flex-col items-center gap-3">
                <p className="text-white/50 text-xs uppercase tracking-wider font-semibold">Scan to Tip</p>
                <div className="w-32 h-32 rounded-xl border-2 border-amber-500/30 bg-white/5 p-2 flex items-center justify-center">
                  <img 
                    src={qrCodeUrl} 
                    alt="Cash App QR Code" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Tip Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {['$5', '$10', '$20'].map((amount) => (
                  <a
                    key={amount}
                    href={cashAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 hover:text-amber-300 font-bold text-sm transition-all border border-amber-500/30 hover:border-amber-500/50"
                  >
                    {amount}
                  </a>
                ))}
              </div>

              {/* Direct Link */}
              <a
                href={cashAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Coffee size={16} />
                Tip on Cash App
              </a>

              {/* Share Section */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-white/50 text-xs uppercase tracking-wider font-semibold mb-3">Share the Love</p>
                <button
                  onClick={handleCopyLink}
                  className={`w-full py-2 px-3 rounded-lg ${
                    copied 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                  } font-semibold text-sm transition-all flex items-center justify-center gap-2`}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Hub Link'}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white/5 border-t border-white/10 px-6 py-3">
              <p className="text-white/30 text-xs text-center">
                Every tip helps support this independent Coachella hub 💜
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
