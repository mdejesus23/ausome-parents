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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                key={post.id}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg"
              >
                <div className="relative h-80 w-full">
                  <Image
                    src={post.image || '/placeholder.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="mb-2 text-sm text-gray-500">
                    {formattedDate} {post.author && `· ${post.author}`}
                  </p>
                  <h3 className="text-text-primary mb-3 text-xl font-semibold">
                    {post.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-gray-700">
                    {post.description}
                  </p>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Read more
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
