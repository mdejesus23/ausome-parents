import { SITE, ISPARTOF } from '@/app/_data/constant';
import PageHero from '@/app/_ui/global/page-hero';
import { Metadata } from 'next';
import { Suspense } from 'react';
import CreateSaintForm from '@/app/_ui/admin/create-saint-form';
import { getTags } from '@/app/_lib/posts/data-services';
import type { Tag } from '@/types';

export const metadata: Metadata = {
  title: 'Admin create Saint in focus article Page | Ausome Parents ',
  description:
    'A Catholic blog offering holy reflections on Bible verses, spiritual insights, and faith-based encouragement for parents.',
  metadataBase: new URL('https://Ausome-parents.melnerdz.com'),
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
  const tags: Tag[] = await getTags();

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
        title="Create Saint in focus article"
        excerpt="Create a Blog Posts"
      />

      <section className="min-h-[60vh] px-4 py-10 md:px-8">
        <div className="container mx-auto">
          {/* Post In Form */}
          <Suspense fallback={<div className="loader"></div>}>
            <CreateSaintForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
