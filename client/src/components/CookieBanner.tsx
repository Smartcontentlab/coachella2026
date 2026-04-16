// CookieBanner — GDPR/CCPA compliant cookie consent banner
// Required for Google AdSense approval and EU/California compliance
// Design: Cinematic Desert Dusk

import { useState, useEffect } from 'react';
import { Cookie, X, Settings, Check } from 'lucide-react';
import { useLocation } from 'wouter';

const CONSENT_KEY = 'coachella2026_cookie_consent';

type ConsentStatus = 'accepted' | 'declined' | 'custom' | null;

interface ConsentPrefs {
  essential: boolean;   // Always true
  analytics: boolean;
  advertising: boolean;
  functional: boolean;
}

export default function CookieBanner() {
  const [status, setStatus] = useState<ConsentStatus>(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>({
    essential: true,
    analytics: true,
    advertising: true,
    functional: true,
  });
  const [, navigate] = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved) {
      setStatus(JSON.parse(saved).status);
    }
  }, []);

  const saveConsent = (s: ConsentStatus, p?: ConsentPrefs) => {
    const data = { status: s, prefs: p || prefs, timestamp: new Date().toISOString() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
    setStatus(s);
  };

  const acceptAll = () => {
    const allOn: ConsentPrefs = { essential: true, analytics: true, advertising: true, functional: true };
    setPrefs(allOn);
    saveConsent('accepted', allOn);
  };

  const declineAll = () => {
    const minPrefs: ConsentPrefs = { essential: true, analytics: false, advertising: false, functional: false };
    setPrefs(minPrefs);
    saveConsent('declined', minPrefs);
  };

  const saveCustom = () => {
    saveConsent('custom', prefs);
    setShowCustomize(false);
  };

  // Don't show if already consented
  if (status !== null) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4"
      style={{ background: 'linear-gradient(to top, oklch(0.10 0.012 45), transparent)' }}
    >
      <div
        className="max-w-4xl mx-auto rounded-2xl border border-white/12 shadow-2xl overflow-hidden"
        style={{ background: 'oklch(0.15 0.018 45)' }}
      >
        {!showCustomize ? (
          // Main banner
          <div className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Icon + text */}
              <div className="flex items-start gap-3 flex-1">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                  <Cookie size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-0.5">We use cookies 🍪</p>
                  <p className="text-white/50 text-xs leading-relaxed">
                    We use cookies to enhance your experience, display personalized ads, and analyze site traffic.
                    By clicking "Accept All", you consent to our use of cookies as described in our{' '}
                    <button
                      onClick={() => navigate('/cookie-policy')}
                      className="text-amber-400 hover:text-amber-300 underline"
                    >
                      Cookie Policy
                    </button>
                    {' '}and{' '}
                    <button
                      onClick={() => navigate('/privacy')}
                      className="text-amber-400 hover:text-amber-300 underline"
                    >
                      Privacy Policy
                    </button>
                    .
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setShowCustomize(true)}
                  className="flex items-center gap-1.5 px-3 py-2 text-white/50 hover:text-white/80 text-xs font-semibold rounded-xl border border-white/10 hover:bg-white/5 transition-all"
                >
                  <Settings size={12} />
                  Customize
                </button>
                <button
                  onClick={declineAll}
                  className="flex-1 sm:flex-none px-3 py-2 text-white/50 hover:text-white/80 text-xs font-semibold rounded-xl border border-white/10 hover:bg-white/5 transition-all"
                >
                  Decline
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition-colors shadow-lg shadow-amber-500/20"
                >
                  <Check size={12} />
                  Accept All
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Customize panel
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Settings size={15} className="text-amber-400" />
                <p className="text-white font-bold text-sm">Cookie Preferences</p>
              </div>
              <button
                onClick={() => setShowCustomize(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/8 transition-colors"
              >
                <X size={14} className="text-white/50" />
              </button>
            </div>
            <div className="space-y-3 mb-4">
              {[
                { key: 'essential' as const, label: 'Essential Cookies', desc: 'Required for the site to function. Cannot be disabled.', locked: true },
                { key: 'functional' as const, label: 'Functional Cookies', desc: 'Remember your schedule planner and preferences.', locked: false },
                { key: 'analytics' as const, label: 'Analytics Cookies', desc: 'Help us understand how visitors use the site.', locked: false },
                { key: 'advertising' as const, label: 'Advertising Cookies', desc: 'Used by Google AdSense to show relevant ads.', locked: false },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between gap-3 py-2 border-b border-white/6 last:border-0">
                  <div className="flex-1">
                    <p className="text-white/85 text-sm font-semibold">{item.label}</p>
                    <p className="text-white/40 text-xs">{item.desc}</p>
                  </div>
                  {item.locked ? (
                    <span className="text-amber-400/60 text-xs font-semibold">Always On</span>
                  ) : (
                    <button
                      onClick={() => setPrefs(p => ({ ...p, [item.key]: !p[item.key] }))}
                      className={`relative w-10 h-5 rounded-full transition-colors ${prefs[item.key] ? 'bg-amber-500' : 'bg-white/15'}`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${prefs[item.key] ? 'translate-x-5' : 'translate-x-0.5'}`}
                      />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={declineAll}
                className="flex-1 py-2 text-white/50 hover:text-white/80 text-xs font-semibold rounded-xl border border-white/10 hover:bg-white/5 transition-all"
              >
                Decline All
              </button>
              <button
                onClick={saveCustom}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
