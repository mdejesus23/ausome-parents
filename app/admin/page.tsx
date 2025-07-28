import { SITE, ISPARTOF } from '@/app/_data/constant';
import PageHero from '../_ui/global/page-hero';
import SignInForm from '../_ui/admin/signin-form';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Admin Login Page | Awesome Parents ',
  description:
    'A Catholic blog offering holy reflections on Bible verses, spiritual insights, and faith-based encouragement for parents.',
  metadataBase: new URL('https://awesome-parents.melnerdz.com'), // Update with your real domain
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Admin Dashboard | ' + SITE.title,
  description: 'Admin dashboard for managing site content and settings.',
  url: SITE.url + '/admin',
  isPartOf: ISPARTOF,
  inLanguage: 'en-US',
};

export default async function Page() {
  return (
    <div className="flex w-full flex-col gap-[3rem]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        imageSrc="/blog-header-bg.webp"
        title="Admin login"
        excerpt="Manage content, users, and settings from a central place."
      />

      <section className="min-h-[60vh] px-4 py-10 md:px-8">
        <div className="container mx-auto">
          {/* Sign In Form */}
          <Suspense>
            <SignInForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
