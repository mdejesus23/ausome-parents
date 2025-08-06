import { getPosts } from '../_lib/data-services';
import type { Post } from '@/types';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { SITE } from '@/app/_data/constant';
import PageHero from '@/app/_ui/global/page-hero';
import { PostListsSkeleton } from '@/app/_ui/skeleton';
import PostLists from '../_ui/sections/post-lists';

export const metadata: Metadata = {
  title: 'Catholic Parenting Blog | Holy Reflections & Bible Insights',
  description:
    'Explore Catholic reflections, parenting tips, and Bible verse insights to nurture faith-filled families and inspire spiritual growth for parents.',
  keywords: [
    'Catholic parenting',
    'Bible reflections for parents',
    'Catholic blog',
    'Christian family guidance',
    'faith-based parenting',
    'Catholic spiritual insights',
  ],
  authors: [{ name: 'Awesome Parents Team', url: SITE.url }],
  openGraph: {
    title: 'Catholic Parenting Blog | Holy Reflections & Bible Insights',
    description:
      'Nurture your faith as a parent with reflections on Bible verses, spiritual parenting tips, and Catholic family guidance.',
    url: `${SITE.url}/posts`,
    type: 'website',
    images: [
      {
        url: `${SITE.url}/blog-header-bg.webp`,
        width: 1200,
        height: 630,
        alt: 'Catholic parenting blog cover image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catholic Parenting Blog | Holy Reflections & Bible Insights',
    description:
      'Faith-based reflections and Bible insights for Catholic parents to guide and inspire family life.',
    images: [`${SITE.url}/blog-header-bg.webp`],
    creator: '@yourtwitterhandle',
  },
  metadataBase: new URL('https://awesome-parents.melnerdz.com'),
};

export default async function Page() {
  const posts: Post[] = await getPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Awesome Parents Blog',
    description:
      'A Catholic blog offering holy reflections on Bible verses, spiritual insights, and faith-based encouragement for parents.',
    url: `${SITE.url}/posts`,
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
        '@id': `${SITE.url}/posts/${post.slug}`,
      },
    })),
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
        title="Holy Reflections & Parenting Articles"
        excerpt="Discover Catholic insights, faith-based parenting tips, and reflections on Bible verses to strengthen your spiritual journey."
      />

      <section className="container mx-auto my-20 px-4">
        <Suspense fallback={<PostListsSkeleton />}>
          <PostLists />
        </Suspense>
      </section>
    </div>
  );
}
