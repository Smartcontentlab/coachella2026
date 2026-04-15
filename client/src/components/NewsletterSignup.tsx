// NewsletterSignup — Real PDF delivery on submission
// Design: Cinematic Desert Dusk
// The PDF is hosted on CDN and triggers an immediate browser download

import { useState } from 'react';
import { Mail, Download, CheckCircle2, Loader2, Gift, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// Real PDF guide hosted on CDN — delivered immediately on signup
const GUIDE_PDF_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663562205962/ezf5wS3Mep9mtLagEKxpKy/coachella2026_festival_guide_30abdc55.pdf';

function triggerDownload(email: string) {
  // Save email locally for analytics
  try {
    const existing: string[] = JSON.parse(localStorage.getItem('coachella_subscribers') || '[]');
    if (!existing.includes(email)) {
      existing.push(email);
      localStorage.setItem('coachella_subscribers', JSON.stringify(existing));
    }
  } catch {}

  // Trigger immediate PDF download
  const link = document.createElement('a');
  link.href = GUIDE_PDF_URL;
  link.download = 'Coachella_2026_Ultimate_Festival_Guide.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

interface NewsletterSignupProps {
  variant?: 'banner' | 'footer';
}

export default function NewsletterSignup({ variant = 'banner' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');
    await new Promise(r => setTimeout(r, 700));

    triggerDownload(email);
    setStatus('success');

    toast.success('Your guide is downloading! 🎉', {
      description: 'Check your Downloads folder for the PDF',
      duration: 6000,
    });
  };

  // ── FOOTER VARIANT ──
  if (variant === 'footer') {
    if (status === 'success') {
      return (
        <div className="flex items-center gap-3 py-2">
          <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={15} className="text-green-400" />
          </div>
          <div>
            <p className="text-green-400 font-semibold text-sm">Downloading now! 🎉</p>
            <button
              onClick={() => triggerDownload(email)}
              className="text-white/35 text-xs hover:text-white/60 transition-colors underline"
            >
              Click here if it didn't start
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <p className="text-white/70 text-sm font-semibold mb-2">Get the free festival guide PDF</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Mail size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setStatus('idle'); setErrorMsg(''); }}
              placeholder="your@email.com"
              className="w-full bg-white/8 border border-white/12 rounded-lg pl-8 pr-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-lg transition-colors flex-shrink-0 disabled:opacity-60 flex items-center gap-1.5"
          >
            {status === 'loading' ? <Loader2 size={13} className="animate-spin" /> : <><Download size={13} /> Get PDF</>}
          </button>
        </form>
        {errorMsg && <p className="text-red-400 text-xs mt-1.5 pl-1">{errorMsg}</p>}
      </div>
    );
  }

  // ── BANNER VARIANT ──
  return (
    <div className="relative rounded-2xl overflow-hidden border border-amber-500/20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-transparent to-rose-900/20" />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 70% 50%, oklch(0.68 0.16 55 / 0.10), transparent 60%)' }} />
      {/* Sparkle dots */}
      <div className="absolute top-4 right-8 w-1.5 h-1.5 rounded-full bg-amber-400/40" />
      <div className="absolute top-12 right-20 w-1 h-1 rounded-full bg-rose-400/30" />
      <div className="absolute bottom-6 right-12 w-2 h-2 rounded-full bg-amber-500/25" />

      <div className="relative z-10 p-6 sm:p-8">
        {status === 'success' ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={28} className="text-green-400" />
            </div>
            <h3 className="text-white font-black text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your guide is downloading! 🎉
            </h3>
            <p className="text-white/55 text-sm mb-1">
              Check your <strong className="text-white/75">Downloads folder</strong> for the PDF
            </p>
            <p className="text-white/35 text-xs mb-4">Filename: Coachella_2026_Ultimate_Festival_Guide.pdf</p>
            <div className="flex items-center justify-center gap-2 text-amber-400 text-sm font-medium mb-4">
              <Sparkles size={14} />
              <span>See you in the desert! 🌵</span>
            </div>
            <button
              onClick={() => triggerDownload(email)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 text-white/60 text-sm rounded-xl transition-colors border border-white/10"
            >
              <Download size={13} />
              Download again
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Left: copy */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Gift size={15} className="text-amber-400" />
                </div>
                <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Free Instant Download</span>
              </div>
              <h3 className="text-white font-black text-xl sm:text-2xl mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Get the Ultimate<br />Coachella 2026 Guide
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-4">
                Your complete insider's handbook — packing list, stage guide, must-see sets for Weekend 2, food picks, and safety tips. <strong className="text-white/75">PDF delivered instantly to your browser.</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {['📋 Full packing list', '🗺️ Stage guide', '🎵 Must-see sets', '🌮 Food picks', '🌵 Safety tips'].map(item => (
                  <span key={item} className="text-xs text-white/50 bg-white/6 border border-white/8 px-2.5 py-1 rounded-full">{item}</span>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="w-full sm:w-72 flex-shrink-0">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setStatus('idle'); setErrorMsg(''); }}
                    placeholder="Enter your email address"
                    className="w-full bg-white/8 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-amber-500/60 focus:bg-white/12 transition-all"
                  />
                </div>
                {errorMsg && <p className="text-red-400 text-xs pl-1">{errorMsg}</p>}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Preparing your guide...
                    </>
                  ) : (
                    <>
                      <Download size={15} />
                      Download Free Guide
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
                <p className="text-white/25 text-[10px] text-center">
                  No spam. Instant PDF download. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
