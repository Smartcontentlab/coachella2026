// About & Contact Page — Required for AdSense approval and user trust signals
// Design: Cinematic Desert Dusk

import { useState } from 'react';
import { ChevronLeft, Mail, Heart, Music, Calendar, Play, Radio, CheckCircle2, ExternalLink } from 'lucide-react';
import { useLocation } from 'wouter';
import { toast } from 'sonner';

const CONTACT_EMAIL = 'adminscsf@icloud.com';

export default function About() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    // Open mailto link as the contact method (no backend required)
    const subject = encodeURIComponent(form.subject || `Message from ${form.name} via Coachella2026.guide`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, '_blank');
    setSent(true);
    toast.success('Opening your email client!', { description: 'Your message has been pre-filled and ready to send.' });
  };

  return (
    <div className="min-h-screen pb-16" style={{ background: 'oklch(0.12 0.015 45)' }}>
      {/* Header */}
      <div className="border-b border-white/8" style={{ background: 'oklch(0.14 0.016 45)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5">
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
                About Coachella2026.guide
              </h1>
              <p className="text-white/50 text-sm">The story behind the site and how to reach us</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* About section */}
          <div className="space-y-5">
            {/* Mission */}
            <div className="rounded-2xl border border-white/8 p-6" style={{ background: 'oklch(0.14 0.016 45)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Heart size={15} className="text-amber-400" />
                </div>
                <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>Our Mission</h2>
              </div>
              <p className="text-white/65 text-sm leading-relaxed mb-3">
                Coachella2026.guide is an independent fan-made website built by <strong className="text-white/80">Armando Guzman</strong>, founder of <strong className="text-white/80">Smartcontent Lab LLC</strong> — a San Francisco-based digital media company dedicated to creating high-quality, fan-first web experiences around culture, music, and live events.
              </p>
              <p className="text-white/65 text-sm leading-relaxed mb-3">
                As a lifelong music fan and Coachella attendee, Armando built this site because he was frustrated by how scattered and hard-to-find the official performance videos were. The goal is simple: make it as easy as possible for every fan — whether attending in person or watching from home — to experience every set.
              </p>
              <p className="text-white/65 text-sm leading-relaxed">
                We organize every full Weekend 1 performance video by day and stage, provide Weekend 2 previews, and give attendees a powerful schedule planner so they never miss a set. Everything is free, no account required.
              </p>
            </div>

            {/* What we offer */}
            <div className="rounded-2xl border border-white/8 p-6" style={{ background: 'oklch(0.14 0.016 45)' }}>
              <h2 className="text-white font-bold text-lg mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>What We Offer</h2>
              <div className="space-y-3">
                {[
                  { icon: <Play size={14} className="text-amber-400" />, title: 'Weekend 1 Full Performances', desc: 'Every available full set from Weekend 1, organized by day and stage' },
                  { icon: <Calendar size={14} className="text-rose-400" />, title: 'Weekend 2 Schedule Planner', desc: 'Build your personal W2 schedule with conflict detection' },
                  { icon: <Radio size={14} className="text-red-400" />, title: 'Live Stream Hub', desc: 'Watch official Coachella YouTube streams with our watch party chat' },
                  { icon: <Music size={14} className="text-emerald-400" />, title: 'Artist Pages', desc: 'Individual pages for every artist with videos and social media links' },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white/85 text-sm font-semibold">{item.title}</p>
                      <p className="text-white/45 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl border border-amber-500/15 bg-amber-500/5 p-5">
              <p className="text-amber-300/80 text-xs font-bold uppercase tracking-wider mb-2">Important Disclaimer</p>
              <p className="text-white/50 text-sm leading-relaxed">
                This website is an independent fan project. We are <strong className="text-white/70">not affiliated with, endorsed by, or sponsored by</strong> Coachella, Goldenvoice, AEG Presents, or any artists featured on this site. All performance videos are embedded from the official{' '}
                <a href="https://www.youtube.com/@coachella" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline inline-flex items-center gap-0.5">
                  Coachella YouTube channel <ExternalLink size={10} />
                </a>
                {' '}and remain the property of their respective owners.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <div className="rounded-2xl border border-white/8 p-6" style={{ background: 'oklch(0.14 0.016 45)' }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Mail size={15} className="text-amber-400" />
                </div>
                <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>Contact Us</h2>
              </div>

              {sent ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={24} className="text-green-400" />
                  </div>
                  <p className="text-white font-bold mb-2">Email client opened!</p>
                  <p className="text-white/50 text-sm mb-4">Your message has been pre-filled. Just hit send in your email app.</p>
                  <p className="text-white/35 text-xs">Or email us directly at{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-400 hover:text-amber-300 underline">{CONTACT_EMAIL}</a>
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 text-white/40 hover:text-white/70 text-sm transition-colors underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/50 text-xs font-semibold mb-1.5 block">Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        className="w-full bg-white/6 border border-white/12 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs font-semibold mb-1.5 block">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="w-full bg-white/6 border border-white/12 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-semibold mb-1.5 block">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      placeholder="What's this about?"
                      className="w-full bg-white/6 border border-white/12 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-semibold mb-1.5 block">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us what you need..."
                      rows={5}
                      className="w-full bg-white/6 border border-white/12 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-amber-500/50 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20 hover:-translate-y-0.5"
                  >
                    <Mail size={15} />
                    Send Message
                  </button>
                  <p className="text-white/25 text-xs text-center">
                    Or email directly:{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-400/70 hover:text-amber-400 underline">
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                </form>
              )}
            </div>

            {/* Contact reasons */}
            <div className="mt-4 rounded-xl border border-white/6 p-4" style={{ background: 'oklch(0.13 0.014 45)' }}>
              <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-2">We'd love to hear about</p>
              <div className="space-y-1">
                {[
                  'Sponsorship & advertising inquiries',
                  'Missing or incorrect video/lineup info',
                  'Partnership opportunities',
                  'Press & media requests',
                  'General feedback & suggestions',
                  'Copyright / DMCA notices',
                ].map(item => (
                  <p key={item} className="text-white/45 text-xs flex items-center gap-1.5">
                    <span className="text-amber-500/50">·</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
