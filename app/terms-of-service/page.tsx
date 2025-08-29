// app/terms-of-service/page.tsx

import { SITE } from '@/app/_data/constant';
import { Metadata } from 'next';
import PageHero from '@/app/_ui/global/page-hero';

export const metadata: Metadata = {
  title: 'Terms of Service | Ausome Parents',
  description:
    'Read the Terms of Service for Ausome Parents to understand your rights and responsibilities when using our website, subscribing to newsletters, or creating an account.',
  openGraph: {
    title: 'Terms of Service | Ausome Parents',
    description:
      'Understand the terms and conditions for using Ausome Parents, including content use, user accounts, and limitations of liability.',
    url: `${SITE.url}/terms-of-service`,
    type: 'website',
    images: [
      {
        url: `${SITE.url}/terms-of-service-opengraph.png`,
        width: 1200,
        height: 630,
        alt: 'Terms of Service cover image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Ausome Parents',
    description:
      'Review the Terms of Service for Ausome Parents to learn about website use, content sharing, and user responsibilities.',
    images: [
      {
        url: `${SITE.url}/terms-of-service-opengraph.png`,
        width: 1200,
        height: 630,
        alt: 'Terms of Service cover image',
      },
    ],
    creator: '@yourtwitterhandle',
  },
  metadataBase: new URL(SITE.url),
};

export default function TermsOfServicePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service',
    description:
      'Read the Terms of Service for Ausome Parents to understand your rights and responsibilities when using our website.',
    url: `${SITE.url}/terms-of-service`,
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
        title="Terms of Service"
        excerpt="Understand your rights and responsibilities when using Ausome Parents."
      />

      <section className="prose prose-lg container mx-auto my-20 px-4">
        <h1>Terms of Service</h1>
        <p>
          <strong>Effective Date:</strong> August 29, 2025
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using <strong>Ausome Parents</strong> (the
          &quot;Website&quot;), you agree to these Terms of Service. If you do
          not agree, please discontinue use of the Website immediately.
        </p>

        <h2>2. Use of Content</h2>
        <p>
          All reflections, articles, and spiritual insights on this Website are
          provided for informational and inspirational purposes only. Content
          may not be copied, reproduced, or distributed without proper
          attribution or prior written permission.
        </p>
        <p>
          Some content may reference or be inspired by external resources. All
          rights for third-party content remain with their original owners.
        </p>

        <h2>3. User Accounts</h2>
        <p>
          If user accounts are introduced, you are responsible for maintaining
          the confidentiality of your login information and for all activities
          under your account. Misuse of accounts may result in suspension or
          termination.
        </p>

        <h2>4. Newsletter &amp; Communication</h2>
        <p>
          By subscribing to our newsletter or contacting us, you consent to
          receive communications from us. You may opt out at any time using the
          unsubscribe link or by contacting us directly.
        </p>

        <h2>5. Cookies &amp; Data</h2>
        <p>
          We may use cookies to improve user experience and remember
          preferences. For details, please refer to our{' '}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>

        <h2>6. Disclaimer</h2>
        <p>
          The Website&apos;s content is provided in good faith but without any
          warranties, express or implied. <strong>Ausome Parents</strong> does
          not provide professional counseling, medical, or legal advice. Users
          should seek professional guidance where appropriate.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law,{' '}
          <strong>Ausome Parents</strong> shall not be liable for any direct,
          indirect, incidental, or consequential damages arising from your use
          of the Website.
        </p>

        <h2>8. Third-Party Links</h2>
        <p>
          This Website may contain links to external sites. We are not
          responsible for the content, policies, or practices of third-party
          websites.
        </p>

        <h2>9. Changes to Terms</h2>
        <p>
          We may update these Terms of Service at any time. Continued use of the
          Website after changes are posted constitutes your acceptance of the
          updated terms.
        </p>

        <h2>10. Contact Us</h2>
        <p>If you have questions about these Terms, please contact:</p>
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
