// Cookie Policy Page — Required for GDPR compliance and Google AdSense
// Design: Cinematic Desert Dusk

import LegalPage from '@/components/LegalPage';

const SITE_NAME = 'Coachella2026.guide';
const CONTACT_EMAIL = 'adminscsf@icloud.com';
const LAST_UPDATED = 'April 15, 2026';

export default function CookiePolicy() {
  return (
    <LegalPage
      title="Cookie Policy"
      subtitle={`How ${SITE_NAME} uses cookies and similar tracking technologies`}
      lastUpdated={LAST_UPDATED}
      sections={[
        {
          title: '1. What Are Cookies?',
          content: (
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the website owners. Cookies can be "persistent" (they remain on your device until deleted) or "session" cookies (they are deleted when you close your browser).
            </p>
          ),
        },
        {
          title: '2. How We Use Cookies',
          content: (
            <>
              <p>We use cookies for the following purposes:</p>
              <div className="space-y-3 mt-2">
                <div className="rounded-lg border border-white/8 p-3" style={{ background: 'oklch(0.16 0.018 45)' }}>
                  <p className="text-white/85 font-semibold text-sm mb-1">Essential Cookies</p>
                  <p>These cookies are necessary for the website to function and cannot be switched off. They include cookies that remember your schedule planner selections and newsletter signup status (stored in localStorage).</p>
                </div>
                <div className="rounded-lg border border-white/8 p-3" style={{ background: 'oklch(0.16 0.018 45)' }}>
                  <p className="text-white/85 font-semibold text-sm mb-1">Analytics Cookies</p>
                  <p>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us understand which pages are most popular and how visitors move around the site.</p>
                </div>
                <div className="rounded-lg border border-white/8 p-3" style={{ background: 'oklch(0.16 0.018 45)' }}>
                  <p className="text-white/85 font-semibold text-sm mb-1">Advertising Cookies (Google AdSense)</p>
                  <p>These cookies are set by Google AdSense to display advertisements that are relevant and engaging for you. They may track your browsing activity across websites to build a profile of your interests and show you relevant ads on other sites.</p>
                </div>
                <div className="rounded-lg border border-white/8 p-3" style={{ background: 'oklch(0.16 0.018 45)' }}>
                  <p className="text-white/85 font-semibold text-sm mb-1">YouTube Cookies</p>
                  <p>When you interact with embedded YouTube videos on our site, YouTube (Google LLC) may set cookies on your device. These cookies are governed by Google's Privacy Policy and may be used for analytics, advertising, and personalization purposes.</p>
                </div>
              </div>
            </>
          ),
        },
        {
          title: '3. Third-Party Cookies',
          content: (
            <>
              <p>In addition to our own cookies, we may also use various third-party cookies to report usage statistics and deliver advertisements:</p>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-white/60 font-semibold">Provider</th>
                      <th className="text-left py-2 pr-4 text-white/60 font-semibold">Purpose</th>
                      <th className="text-left py-2 text-white/60 font-semibold">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { provider: 'Google AdSense', purpose: 'Personalized advertising', type: 'Advertising' },
                      { provider: 'Google Analytics', purpose: 'Website analytics', type: 'Analytics' },
                      { provider: 'YouTube (Google)', purpose: 'Video playback & analytics', type: 'Functional' },
                      { provider: 'Mailchimp / ConvertKit', purpose: 'Email newsletter', type: 'Functional' },
                    ].map(row => (
                      <tr key={row.provider}>
                        <td className="py-2 pr-4 text-white/70">{row.provider}</td>
                        <td className="py-2 pr-4 text-white/55">{row.purpose}</td>
                        <td className="py-2 text-amber-400/80">{row.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ),
        },
        {
          title: '4. Managing Cookies',
          content: (
            <>
              <p>You have several options for managing cookies:</p>
              <ul className="list-disc list-inside space-y-2 pl-2 mt-2">
                <li>
                  <strong className="text-white/85">Browser settings:</strong> Most browsers allow you to refuse cookies or delete existing cookies. The method for doing so varies by browser — check your browser's help documentation for instructions.
                </li>
                <li>
                  <strong className="text-white/85">Google Ad Settings:</strong> Opt out of personalized Google ads at{' '}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">
                    google.com/settings/ads
                  </a>
                </li>
                <li>
                  <strong className="text-white/85">Network Advertising Initiative:</strong> Opt out of interest-based advertising at{' '}
                  <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">
                    optout.networkadvertising.org
                  </a>
                </li>
                <li>
                  <strong className="text-white/85">Your Online Choices:</strong> Manage advertising cookies at{' '}
                  <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">
                    youronlinechoices.com
                  </a>
                </li>
              </ul>
              <p className="mt-2">
                Please note that disabling cookies may affect the functionality of our website. Your schedule planner data and newsletter preferences are stored in your browser's localStorage, which will be cleared if you clear your browser data.
              </p>
            </>
          ),
        },
        {
          title: '5. Cookie Consent',
          content: (
            <p>
              By continuing to use our website after seeing our cookie consent banner, you consent to our use of cookies as described in this policy. You can withdraw your consent at any time by adjusting your browser settings or using the opt-out links provided above.
            </p>
          ),
        },
        {
          title: '6. Updates to This Policy',
          content: (
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. We will post the updated policy on this page with a revised "Last updated" date.
            </p>
          ),
        },
        {
          title: '7. Contact',
          content: (
            <p>
              If you have questions about our use of cookies, contact us at:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-400 hover:text-amber-300 underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          ),
        },
      ]}
    />
  );
}
