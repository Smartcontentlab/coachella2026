// Terms of Service Page — Required for AdSense, affiliate programs, and legal protection
// Design: Cinematic Desert Dusk

import LegalPage from '@/components/LegalPage';

const SITE_NAME = 'Coachella2026.guide';
const SITE_URL = 'https://coachella2026.guide';
const CONTACT_EMAIL = 'adminsmartcontent@aromicmail.io';
const LAST_UPDATED = 'April 15, 2026';

export default function TermsOfService() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle={`The rules and guidelines for using ${SITE_NAME}`}
      lastUpdated={LAST_UPDATED}
      sections={[
        {
          title: '1. Agreement to Terms',
          content: (
            <p>
              By accessing and using {SITE_NAME} ("{SITE_URL}"), you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website. We reserve the right to change these terms at any time, and your continued use of the site constitutes acceptance of those changes.
            </p>
          ),
        },
        {
          title: '2. Description of Service',
          content: (
            <>
              <p>
                {SITE_NAME} is a fan-made informational website that provides:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Embedded YouTube performance videos from the official Coachella YouTube channel</li>
                <li>Artist lineup information and set schedules for Coachella 2026</li>
                <li>A personal schedule planning tool for Weekend 2</li>
                <li>A live stream hub linking to official Coachella YouTube streams</li>
                <li>A free downloadable festival guide PDF</li>
                <li>Links to artist social media profiles and streaming platforms</li>
              </ul>
              <p className="mt-2">
                <strong className="text-white/85">Important disclaimer:</strong> This website is an independent fan project and is not affiliated with, endorsed by, or sponsored by Coachella, Goldenvoice, AEG Presents, or any artists featured on this site.
              </p>
            </>
          ),
        },
        {
          title: '3. Intellectual Property',
          content: (
            <>
              <p>
                <strong className="text-white/85">Our content:</strong> The original content on this website — including our written guides, design, layout, and code — is owned by {SITE_NAME} and is protected by copyright law.
              </p>
              <p>
                <strong className="text-white/85">Third-party content:</strong> All performance videos are embedded from the official Coachella YouTube channel and remain the exclusive property of Goldenvoice, AEG Presents, and the respective artists. We do not host, download, or redistribute any video content. Artist names, logos, and images are the property of their respective owners.
              </p>
              <p>
                <strong className="text-white/85">Fair use:</strong> Our use of artist names, set information, and embedded official YouTube videos is for informational and commentary purposes under the principles of fair use.
              </p>
            </>
          ),
        },
        {
          title: '4. User Conduct',
          content: (
            <>
              <p>By using our website, you agree not to:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Use the site for any unlawful purpose or in violation of any regulations</li>
                <li>Attempt to gain unauthorized access to any part of the website or its related systems</li>
                <li>Transmit any harmful, offensive, or disruptive content through our watch party chat feature</li>
                <li>Use automated tools to scrape, crawl, or harvest data from our website</li>
                <li>Impersonate any person or entity in our chat features</li>
                <li>Post spam, advertisements, or promotional material in our chat</li>
              </ul>
            </>
          ),
        },
        {
          title: '5. Watch Party Chat',
          content: (
            <>
              <p>
                Our website includes a watch party chat feature. By using this feature, you acknowledge that:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Chat messages are stored locally in your browser only and are not transmitted to our servers</li>
                <li>You are responsible for any content you post in the chat</li>
                <li>We reserve the right to disable the chat feature at any time</li>
                <li>You will not use the chat to harass, threaten, or harm other users</li>
              </ul>
            </>
          ),
        },
        {
          title: '6. Affiliate Links and Advertising',
          content: (
            <p>
              Our website contains affiliate links and displays third-party advertisements. We may earn a commission when you click on affiliate links and make a purchase. Advertisements are served by Google AdSense and other advertising networks. We are not responsible for the content of third-party advertisements or the products/services they promote. Any transactions you make with third-party advertisers or affiliate partners are solely between you and that third party.
            </p>
          ),
        },
        {
          title: '7. Disclaimer of Warranties',
          content: (
            <p>
              This website is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy, completeness, or timeliness of any content on the site, including set times, lineup information, or video availability. Set times and lineup information are subject to change without notice.
            </p>
          ),
        },
        {
          title: '8. Limitation of Liability',
          content: (
            <p>
              To the fullest extent permitted by law, {SITE_NAME} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use our website, including but not limited to loss of data, loss of profits, or any other damages, even if we have been advised of the possibility of such damages.
            </p>
          ),
        },
        {
          title: '9. External Links',
          content: (
            <p>
              Our website contains links to external websites, including YouTube, artist social media profiles, ticket platforms, and streaming services. We are not responsible for the content, privacy practices, or terms of service of any external websites. The inclusion of any link does not imply our endorsement of that site.
            </p>
          ),
        },
        {
          title: '10. DMCA Copyright Policy',
          content: (
            <p>
              We respect intellectual property rights. If you believe any content on our website infringes your copyright, please see our{' '}
              <a href="/dmca" className="text-amber-400 hover:text-amber-300 underline">DMCA Policy</a>
              {' '}for instructions on how to submit a takedown notice. We will respond promptly to valid DMCA notices.
            </p>
          ),
        },
        {
          title: '11. Governing Law',
          content: (
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the State of California, USA. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in San Francisco County, California. This website is operated by Armando Guzman / Smartcontent Lab LLC, San Francisco, California, USA.
            </p>
          ),
        },
        {
          title: '12. Contact',
          content: (
            <p>
              For questions about these Terms of Service, contact us at:{' '}
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
