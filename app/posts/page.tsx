import { getPosts, fetchPostsPages } from '../_lib/data-services';
import type { Post } from '@/types';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { SITE } from '@/app/_data/constant';
import PageHero from '@/app/_ui/global/page-hero';
import { PostListsSkeleton } from '@/app/_ui/skeleton';
import PostLists from '../_ui/sections/post-lists';
import Pagination from '../_ui/pagination';

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
  authors: [{ name: 'Ausome Parents Team', url: SITE.url }],
  openGraph: {
    title: 'Catholic Parenting Blog | Holy Reflections & Bible Insights',
    description:
      'Nurture your faith as a parent with reflections on Bible verses, spiritual parenting tips, and Catholic family guidance.',
    url: `${SITE.url}/posts`,
    type: 'website',
    images: [
      {
        url: 'https://ausome-parents.melnerdz.com/posts-opengraph-image.png',
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
    images: [
      {
        url: 'https://ausome-parents.melnerdz.com/posts-opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Catholic parenting blog cover image',
      },
    ],
    creator: '@yourtwitterhandle',
  },
  metadataBase: new URL('https://ausome-parents.melnerdz.com/'),
};

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = params?.page || 1;

  const [totalPages, posts]: [totalPages: number, posts: Post[]] =
    await Promise.all([fetchPostsPages(query), getPosts()]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Ausome Parents Blog',
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
        <Suspense key={query + currentPage} fallback={<PostListsSkeleton />}>
          <PostLists query={query} currentPage={Number(currentPage)} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </section>
    </div>
  );
}
