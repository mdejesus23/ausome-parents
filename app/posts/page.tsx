import { getPosts } from '../_lib/data-services';
import type { Post } from '@/types';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { SITE } from '@/app/_data/constant';
import PageHero from '@/app/_ui/global/page-hero';
import { FeaturedArticlesSkeleton } from '@/app/_ui/skeleton';
import PostLists from '../_ui/sections/post-lists';

export const metadata: Metadata = {
  title: 'Posts | Awesome Parents ',
  description:
    'A Catholic blog offering holy reflections on Bible verses, spiritual insights, and faith-based encouragement for parents.',
  metadataBase: new URL('https://awesome-parents.melnerdz.com'), // Update with your real domain
};

export default async function Page() {
  const posts: Post[] = await getPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Posts | ' + SITE.title,
    url: SITE.url + '/posts',
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      image: post.image ? [SITE.url + post.image] : undefined,
      datePublished: post.pub_date,
      dateModified: post.pub_date,
      description: post.description,
      author: {
        '@type': 'Person',
        name: post.author || 'Admin',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': SITE.url + '/posts/' + post.slug,
      },
    })),
  };

  return (
    <div className="flex w-full flex-col gap-[3rem]">
      {/* ✅ Inject JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero imageSrc="/blog-header-bg.webp" title="Posts Article" />

      <section className="container mx-auto my-20 px-4">
        <Suspense fallback={<FeaturedArticlesSkeleton />}>
          <PostLists />
        </Suspense>
      </section>
    </div>
  );
}
