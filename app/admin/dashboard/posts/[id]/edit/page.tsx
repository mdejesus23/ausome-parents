import { SITE, ISPARTOF } from '@/app/_data/constant';
import PageHero from '@/app/_ui/global/page-hero';
import { Metadata } from 'next';
import { Suspense } from 'react';
import EditPostForm from '@/app/_ui/admin/edit-post-form';
import { getTags, getPostById } from '@/app/_lib/posts/data-services';
import type { Tag, Post } from '@/types';
import { notFound } from 'next/navigation';
import Loader from '@/app/_ui/loader';

export const metadata: Metadata = {
  title: 'Admin Login Page | Ausome Parents ',
  description:
    'A Catholic blog offering holy reflections on Bible verses, spiritual insights, and faith-based encouragement for parents.',
  metadataBase: new URL('https://Ausome-parents.melnerdz.com'), // Update with your real domain
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

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const [post, tags]: [post: Post, tags: Tag[]] = await Promise.all([
    getPostById(id),
    getTags(),
  ]);

  if (!post) {
    notFound();
  }

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
          <Suspense fallback={<Loader />}>
            <EditPostForm tags={tags} post={post} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
