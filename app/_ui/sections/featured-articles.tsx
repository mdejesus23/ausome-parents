import Image from 'next/image';
import Link from 'next/link';
import { getPosts } from '@/app/_lib/data-services';
import type { Post } from '@/types';
import Button from '../button';
import { MoveRight } from 'lucide-react';

export default async function FeaturedArticles() {
  const posts: Post[] = await getPosts();

  return (
    <section className="my-20 flex flex-col">
      <div className="container mx-auto px-4 py-2 sm:px-6 md:py-4 lg:px-8 lg:py-6">
        <h2 className="text-text-secondary mb-6 text-center text-3xl font-bold">
          Featured Articles
        </h2>
        <p className="mb-12 text-center text-gray-600">
          Discover insightful articles to guide and inspire you on your
          parenting journey.
        </p>

        <div className="flex items-center justify-center">
          <Button variant="outline" href="/posts" className="mx-auto mb-8">
            View All Articles
            <MoveRight size={15} />
          </Button>
        </div>

        <div className="m grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => {
            const formattedDate = post.pub_date
              ? new Date(post.pub_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : '';

            return (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Image Container */}
                <Link
                  href={`/posts/${post.slug}`}
                  className="relative h-96 w-full overflow-hidden" // 🔁 was h-56
                >
                  <Image
                    src={post.image || '/placeholder.jpg'}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="rounded-t-2xl object-cover transition duration-300 group-hover:scale-105"
                  />
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col px-6 py-5">
                  <p className="mb-2 text-sm text-gray-500">
                    {formattedDate} {post.author && `· ${post.author}`}
                  </p>

                  <h3 className="text-text-primary mb-2 text-lg font-semibold">
                    {post.title}
                  </h3>

                  <p className="mb-4 line-clamp-3 text-gray-700">
                    {post.description || 'No description available.'}
                  </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-text-primary rounded-full bg-blue-100 px-3 py-1 text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/posts/${post.slug}`}
                    className="mt-auto text-sm font-medium text-blue-600 hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
