import { SITE, ISPARTOF } from '@/app/_data/constant';
import PageHero from '@/app/_ui/global/page-hero';
import { Metadata } from 'next';
import { Suspense } from 'react';
import CreatePostForm from '@/app/_ui/admin/posts/create-post-form';
import { getTags } from '@/app/_lib/data-services';
import type { Tag } from '@/types';

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
        title="Create Blog Posts"
        excerpt="Create a Blog Posts"
      />

      <section className="min-h-[60vh] px-4 py-10 md:px-8">
        <div className="container mx-auto">
          {/* Post In Form */}
          <Suspense>
            <CreatePostForm tags={tags} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
