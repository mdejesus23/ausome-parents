import PageHero from '@/app/_ui/global/page-hero';
import { getPosts } from '@/app/_lib/data-services';
import Image from 'next/image';
import { SITE } from '@/app/_data/constant';

export default async function Page() {
  const posts = await getPosts();

  // ✅ Generate JSON-LD for blog posts
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

      <PageHero
        imageSrc="/blog-header-bg.webp"
        title="Posts List"
        excerpt="Browse all blog posts below."
      />

      <section className="container mx-auto my-20 flex flex-col gap-8 px-4">
        {posts.length === 0 ? (
          <p className="text-text-secondary">No posts found.</p>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-90 w-full overflow-hidden">
                  <Image
                    src={post.image || '/fallback.webp'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col gap-3 p-4">
                  <h3 className="text-text-primary text-lg font-semibold group-hover:underline">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {new Date(post.pub_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>

                  <p className="text-text-secondary line-clamp-3 text-sm">
                    {post.description}
                  </p>

                  {post.tags?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
