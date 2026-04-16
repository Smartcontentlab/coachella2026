// DMCA Notice Page — Required for copyright protection under the Digital Millennium Copyright Act
// Design: Cinematic Desert Dusk

import LegalPage from '@/components/LegalPage';

const SITE_NAME = 'Coachella2026.guide';
const DMCA_EMAIL = 'adminsmartcontent@aromicmail.io';
const LAST_UPDATED = 'April 15, 2026';

export default function DMCA() {
  return (
    <LegalPage
      title="DMCA Copyright Policy"
      subtitle={`Copyright notice and takedown procedures for ${SITE_NAME}`}
      lastUpdated={LAST_UPDATED}
      sections={[
        {
          title: 'Our Commitment to Copyright',
          content: (
            <p>
              {SITE_NAME} respects the intellectual property rights of others and expects our users to do the same. We comply with the Digital Millennium Copyright Act (DMCA) and will respond promptly to notices of alleged copyright infringement that comply with the DMCA.
            </p>
          ),
        },
        {
          title: 'About Our Video Content',
          content: (
            <>
              <p>
                <strong className="text-white/85">Important notice:</strong> All performance videos displayed on this website are embedded directly from the official{' '}
                <a href="https://www.youtube.com/@coachella" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">
                  Coachella YouTube channel
                </a>
                {' '}using YouTube's standard iframe embed feature. We do not host, download, store, or redistribute any video content.
              </p>
              <p>
                All video content remains the exclusive property of Goldenvoice, AEG Presents, and the respective artists. Embedding YouTube videos is explicitly permitted by YouTube's Terms of Service and does not constitute copyright infringement.
              </p>
              <p>
                If you are a rights holder and wish to have a video removed from YouTube, please contact YouTube directly at{' '}
                <a href="https://support.google.com/youtube/answer/2807622" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">
                  YouTube's Copyright Center
                </a>
                . Once a video is removed from YouTube, it will automatically no longer be accessible through our embedded players.
              </p>
            </>
          ),
        },
        {
          title: 'Filing a DMCA Takedown Notice',
          content: (
            <>
              <p>
                If you believe that content on our website (other than embedded YouTube videos) infringes your copyright, please send a written DMCA takedown notice to our designated copyright agent at:{' '}
                <a href={`mailto:${DMCA_EMAIL}`} className="text-amber-400 hover:text-amber-300 underline">
                  {DMCA_EMAIL}
                </a>
              </p>
              <p className="mt-2">Your notice must include all of the following:</p>
              <ol className="list-decimal list-inside space-y-2 pl-2 mt-2">
                <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf</li>
                <li>Identification of the copyrighted work claimed to have been infringed</li>
                <li>Identification of the material that is claimed to be infringing, with enough detail for us to locate it on our website (include the URL)</li>
                <li>Your contact information, including your address, telephone number, and email address</li>
                <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law</li>
                <li>A statement that the information in the notification is accurate, and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner</li>
              </ol>
            </>
          ),
        },
        {
          title: 'Counter-Notice Procedure',
          content: (
            <p>
              If you believe your content was removed in error, you may file a counter-notice. A valid counter-notice must include: your physical or electronic signature; identification of the removed content and its location before removal; a statement under penalty of perjury that you have a good faith belief the content was removed by mistake or misidentification; your name, address, and telephone number; and a statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located.
            </p>
          ),
        },
        {
          title: 'Repeat Infringer Policy',
          content: (
            <p>
              In accordance with the DMCA and other applicable law, we have adopted a policy of terminating, in appropriate circumstances, users who are deemed to be repeat infringers. We may also, at our sole discretion, limit access to our website for users who infringe any intellectual property rights of others.
            </p>
          ),
        },
        {
          title: 'Contact Our DMCA Agent',
          content: (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/8 p-4">
              <p className="text-white/85 font-semibold mb-2">Designated DMCA Agent</p>
              <p><strong className="text-white/85">Armando Guzman / Smartcontent Lab LLC</strong></p>
              <p>San Francisco, California, USA</p>
              <p>Email: <a href={`mailto:${DMCA_EMAIL}`} className="text-amber-400 hover:text-amber-300 underline">{DMCA_EMAIL}</a></p>
              <p className="text-white/40 text-xs mt-2">We will respond to valid DMCA notices within 3–5 business days.</p>
            </div>
          ),
        },
      ]}
    />
  );
}
