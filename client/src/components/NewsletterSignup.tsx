// NewsletterSignup — Email capture with lead magnet
// Design: Cinematic Desert Dusk

import { useState } from 'react';
import { Mail, Download, CheckCircle2, Loader2, Zap } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'banner' | 'inline' | 'footer';
}

export default function NewsletterSignup({ variant = 'banner' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    // Simulate API call — replace with real Mailchimp/ConvertKit endpoint
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className={`rounded-2xl border border-emerald-500/30 bg-emerald-500/8 p-6 text-center ${variant === 'footer' ? 'p-4' : ''}`}>
        <CheckCircle2 size={32} className="text-emerald-400 mx-auto mb-3" />
        <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>You're in!</h3>
        <p className="text-white/60 text-sm mb-3">Check your inbox for the Coachella 2026 Ultimate Setlist Guide PDF.</p>
        <p className="text-emerald-300/70 text-xs">We'll send you weekly festival updates and music discovery picks.</p>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div>
        <p className="text-white/70 text-sm font-semibold mb-2">Get the free setlist guide</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
            placeholder="your@email.com"
            className="flex-1 bg-white/8 border border-white/12 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-amber-500/50 transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-lg transition-colors flex-shrink-0 disabled:opacity-60"
          >
            {status === 'loading' ? <Loader2 size={14} className="animate-spin" /> : 'Get PDF'}
          </button>
        </form>
        {status === 'error' && <p className="text-red-400 text-xs mt-1">{errorMsg}</p>}
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-amber-500/20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-transparent to-rose-900/20" />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 70% 50%, oklch(0.68 0.16 55 / 0.08), transparent 60%)' }} />

      <div className="relative z-10 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Left content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <Download size={15} className="text-amber-400" />
              </div>
              <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Free Download</span>
            </div>
            <h3 className="text-white font-black text-xl sm:text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get the Ultimate<br />Coachella 2026 Guide
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Free PDF with every setlist, set times, stage maps, and our top 20 must-see picks for Weekend 2. Plus weekly music discovery emails.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-white/50">
              {['Full setlists', 'Set time conflicts', 'Stage maps', 'Top 20 picks'].map(item => (
                <span key={item} className="flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="w-full sm:w-72 flex-shrink-0">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
                  placeholder="Enter your email"
                  className="w-full bg-white/8 border border-white/15 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all"
                />
              </div>
              {status === 'error' && <p className="text-red-400 text-xs">{errorMsg}</p>}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/25 disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <>
                    <Zap size={15} />
                    Get Free Guide
                  </>
                )}
              </button>
              <p className="text-white/25 text-[10px] text-center">No spam. Unsubscribe anytime.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
