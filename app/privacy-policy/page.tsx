// app/privacy-policy/page.tsx

import { SITE } from '@/app/_data/constant';
import { Metadata } from 'next';
import PageHero from '@/app/_ui/global/page-hero';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ausome Parents',
  description:
    'Learn how Ausome Parents collects, uses, and protects your personal data including newsletter subscriptions, contact forms, and future user accounts.',
  openGraph: {
    title: 'Privacy Policy | Ausome Parents',
    description:
      'Understand how Ausome Parents respects your privacy and manages your personal data responsibly.',
    url: `${SITE.url}/privacy-policy`,
    type: 'website',
    images: [
      {
        url: `${SITE.url}/privacy-policy-opengraph.png`,
        width: 1200,
        height: 630,
        alt: 'Privacy Policy cover image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Ausome Parents',
    description:
      'Learn how Ausome Parents collects, uses, and protects your personal data responsibly.',
    images: [
      {
        url: `${SITE.url}/privacy-policy-opengraph.png`,
        width: 1200,
        height: 630,
        alt: 'Privacy Policy cover image',
      },
    ],
    creator: '@yourtwitterhandle',
  },
  metadataBase: new URL(SITE.url),
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    description:
      'Learn how Ausome Parents collects, uses, and protects your personal data including newsletter subscriptions, contact forms, and future user accounts.',
    url: `${SITE.url}/privacy-policy`,
    publisher: {
      '@type': 'Organization',
      name: SITE.title,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: SITE.url + SITE.image,
      },
    },
  };

  return (
    <div className="flex w-full flex-col gap-[3rem]">
      {/* ✅ JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        imageSrc="/blog-header-bg.webp"
        title="Privacy Policy"
        excerpt="Learn how Ausome Parents collects, uses, and protects your personal information."
      />

      <section className="prose prose-lg container mx-auto my-20 px-4">
        <h1>Privacy Policy</h1>
        <p>
          <strong>Effective Date:</strong> August 29, 2025
        </p>

        <p>
          Ausome Parents (“we,” “our,” or “us”) respects your privacy and is
          committed to protecting any personal information you share with us.
          This Privacy Policy explains how we collect, use, and safeguard your
          information when you visit our website{' '}
          <a href={SITE.url} target="_blank" rel="noopener noreferrer">
            {SITE.url}
          </a>
          .
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li>
            <strong>Newsletter Subscription:</strong> Name and email address.
          </li>
          <li>
            <strong>Contact Form:</strong> Name, email, and message details you
            provide.
          </li>
          <li>
            <strong>User Accounts (Future Feature):</strong> Name, email, login
            credentials, and other information necessary to create and manage
            your account.
          </li>
          <li>
            <strong>Cookies:</strong> Used to remember sessions and improve your
            experience.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We may use your information to:</p>
        <ul>
          <li>Send newsletters and updates you signed up for.</li>
          <li>Respond to contact form messages.</li>
          <li>Manage user accounts (if you register in the future).</li>
          <li>Improve the website and your overall experience.</li>
        </ul>
        <p>
          We do <strong>not</strong> sell or rent your personal information to
          third parties.
        </p>

        <h2>3. Cookies and Tracking Technologies</h2>
        <p>
          Cookies may be used for login sessions, preferences, and
          functionality. If we add analytics or third-party tools in the future,
          this policy will be updated to reflect how those tools use cookies.
        </p>

        <h2>4. Data Sharing</h2>
        <p>We may share your data only in limited circumstances:</p>
        <ul>
          <li>
            With service providers (e.g., email newsletter platforms, hosting
            providers).
          </li>
          <li>If required by law (e.g., court orders or legal processes).</li>
        </ul>

        <h2>5. Your Rights</h2>
        <p>
          Depending on your location (e.g., EU/EEA under GDPR, California under
          CCPA), you may have the right to:
        </p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of your data.</li>
          <li>
            Withdraw consent for newsletter emails at any time (via
            “unsubscribe” link).
          </li>
          <li>Restrict or object to certain processing of your data.</li>
        </ul>
        <p>
          To exercise these rights, please contact us at{' '}
          <strong>[insert your email here]</strong>.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain your information only as long as necessary to fulfill the
          purposes outlined in this policy, or as required by law.
        </p>

        <h2>7. Security</h2>
        <p>
          We take reasonable steps to protect your data. However, please note
          that no online transmission or storage is 100% secure.
        </p>

        <h2>8. Children’s Privacy</h2>
        <p>
          This website is intended for parents and adults. We do not knowingly
          collect personal information from children under 13.
        </p>

        <h2>9. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The updated
          version will always be posted on this page with the effective date.
        </p>

        <h2>10. Contact Us</h2>
        <p>If you have questions, please contact:</p>
        <p>
          <strong>Ausome Parents</strong>
          <br />
          Author: Melnard De Jesus
          <br />
          Email: <strong>me@melnerdz.com</strong>
        </p>
      </section>
    </div>
  );
}
