import { getPostBySlug } from '@/app/_lib/data-services';
import { notFound } from 'next/navigation';
import Prose from '@/app/_ui/prose';
import PageHero from '@/app/_ui/global/page-hero';
import { SITE, ISPARTOF } from '@/app/_data/constant';
import type { Post } from '@/types';
import { Metadata } from 'next';

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.description || `Read ${post.title} on ${SITE.title}`,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE.url}/posts/${post.slug}`,
      type: 'article',
      images: [
        {
          url: post.image,
          width: '100%',
          height: '100%',
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.image,
          width: '100%',
          height: '100%',
          alt: post.title,
        },
      ],
    },
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post: Post | null = await getPostBySlug(params.slug);

  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.image ? [post.image] : [],
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.pub_date,
    dateModified: post.pub_date,
    description: post.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}/posts/${post.id}`,
    },
    isPartOf: ISPARTOF,
  };

  return (
    <section className="mb-20">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <PageHero
        imageSrc={post.image || '/placeholder.jpg'}
        title={post.title}
        excerpt={post.description}
      />

      {/* Post Content */}
      <div className="mx-auto mt-10 max-w-[45rem] px-4 lg:px-8">
        {/* <div className="mb-8 text-gray-500">
          <span>{new Date(post.pub_date).toLocaleDateString()}</span>
          <span>{post.author}</span>
        </div> */}

        <Prose>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </Prose>
      </div>
    </section>
  );
}
