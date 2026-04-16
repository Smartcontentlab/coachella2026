// Privacy Policy Page — Required for Google AdSense, affiliate programs, and GDPR/CCPA compliance
// Design: Cinematic Desert Dusk

import LegalPage from '@/components/LegalPage';

const SITE_NAME = 'Coachella2026.guide';
const SITE_URL = 'https://coachella2026.guide';
const CONTACT_EMAIL = 'adminscsf@icloud.com';
const LAST_UPDATED = 'April 15, 2026';

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle={`How ${SITE_NAME} collects, uses, and protects your information`}
      lastUpdated={LAST_UPDATED}
      sections={[
        {
          title: '1. Introduction',
          content: (
            <>
              <p>
                Welcome to {SITE_NAME} ("{SITE_URL}"), operated by <strong className="text-white/85">Armando Guzman / Smartcontent Lab LLC</strong>, based in San Francisco, California, USA. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
              <p>
                Please read this policy carefully. If you disagree with its terms, please discontinue use of our site. By accessing or using our website, you agree to the collection and use of information in accordance with this policy.
              </p>
            </>
          ),
        },
        {
          title: '2. Information We Collect',
          content: (
            <>
              <p><strong className="text-white/85">Information you provide voluntarily:</strong> When you sign up for our newsletter, we collect your email address. This is stored locally in your browser and, if you connect a third-party email service, on that service's servers.</p>
              <p><strong className="text-white/85">Information collected automatically:</strong> When you visit our website, we may automatically collect certain information about your device, including your web browser, IP address, time zone, and some cookies installed on your device. We also collect information about the individual web pages you view, what websites or search terms referred you to our site, and information about how you interact with our site.</p>
              <p><strong className="text-white/85">Cookies and tracking technologies:</strong> We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. See our Cookie Policy for more details.</p>
            </>
          ),
        },
        {
          title: '3. How We Use Your Information',
          content: (
            <>
              <p>We use the information we collect in the following ways:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>To operate, maintain, and improve our website</li>
                <li>To send you the free festival guide PDF you requested via our newsletter signup</li>
                <li>To analyze how visitors use our site to improve user experience</li>
                <li>To display relevant advertising through Google AdSense and other advertising partners</li>
                <li>To comply with legal obligations</li>
                <li>To detect and prevent fraudulent activity</li>
              </ul>
            </>
          ),
        },
        {
          title: '4. Google AdSense and Third-Party Advertising',
          content: (
            <>
              <p>
                We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites on the internet. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the internet.
              </p>
              <p>
                You may opt out of personalized advertising by visiting{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">
                  Google Ads Settings
                </a>
                . You can also opt out of a third-party vendor's use of cookies for personalized advertising by visiting{' '}
                <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">
                  www.aboutads.info/choices
                </a>
                .
              </p>
              <p>
                For more information on how Google uses data when you use our site, please visit:{' '}
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">
                  How Google uses data from sites that use our services
                </a>
                .
              </p>
            </>
          ),
        },
        {
          title: '5. Affiliate Links',
          content: (
            <>
              <p>
                Our website may contain affiliate links. This means that if you click on a link and make a purchase, we may receive a small commission at no additional cost to you. We only recommend products and services we believe are genuinely useful to our visitors.
              </p>
              <p>
                We participate in affiliate programs including but not limited to: Amazon Associates, StubHub, Vivid Seats, Booking.com, and other music and travel affiliate programs. These third parties may use cookies to track purchases made through our affiliate links.
              </p>
            </>
          ),
        },
        {
          title: '6. YouTube Embedded Videos',
          content: (
            <p>
              Our website embeds videos from YouTube (owned by Google LLC). When you interact with embedded YouTube videos, YouTube may collect data about your interaction. YouTube's use of data is governed by{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">
                Google's Privacy Policy
              </a>
              . All performance videos embedded on this site are from the official Coachella YouTube channel and are embedded with YouTube's standard embed code.
            </p>
          ),
        },
        {
          title: '7. Analytics',
          content: (
            <p>
              We may use web analytics services (such as Google Analytics or similar tools) to help us understand how visitors use our site. These services may collect information such as your IP address, browser type, pages visited, and time spent on pages. This information is used in aggregate form to improve our website. You can opt out of Google Analytics by installing the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          ),
        },
        {
          title: '8. Data Sharing and Disclosure',
          content: (
            <>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong className="text-white/85">Service providers:</strong> We may share data with trusted third-party service providers who assist us in operating our website (e.g., email service providers like Mailchimp or ConvertKit)</li>
                <li><strong className="text-white/85">Legal requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities</li>
                <li><strong className="text-white/85">Business transfers:</strong> If we sell or transfer our website, your information may be transferred as part of that transaction</li>
              </ul>
            </>
          ),
        },
        {
          title: '9. Your Rights (GDPR & CCPA)',
          content: (
            <>
              <p>
                <strong className="text-white/85">European Union residents (GDPR):</strong> You have the right to access, correct, delete, or restrict processing of your personal data. You also have the right to data portability and to withdraw consent at any time. To exercise these rights, contact us at {CONTACT_EMAIL}.
              </p>
              <p>
                <strong className="text-white/85">California residents (CCPA):</strong> You have the right to know what personal information we collect, the right to delete personal information, and the right to opt out of the sale of personal information. We do not sell personal information. To exercise your rights, contact us at {CONTACT_EMAIL}.
              </p>
            </>
          ),
        },
        {
          title: '10. Children\'s Privacy',
          content: (
            <p>
              Our website is not directed to children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at {CONTACT_EMAIL} and we will delete such information from our records.
            </p>
          ),
        },
        {
          title: '11. Data Security',
          content: (
            <p>
              We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          ),
        },
        {
          title: '12. Changes to This Policy',
          content: (
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          ),
        },
        {
          title: '13. Contact Us',
          content: (
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{' '}
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
