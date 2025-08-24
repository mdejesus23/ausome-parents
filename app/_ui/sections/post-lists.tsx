import Card from '../card';
import { getFilteredPosts } from '@/app/_lib/posts/data-services';
import type { Post } from '@/types';
import { Calendar, User } from 'lucide-react';
import FilterPost from '../filter-post';

interface Props {
  query: string;
  currentPage: number;
}

export default async function PostLists({ query, currentPage }: Props) {
  const posts: Post[] = await getFilteredPosts(query, currentPage);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <FilterPost />

          {/* Blog Posts Grid */}
          <div className="lg:col-span-3">
            <h2 className="text-text-secondary mb-6 text-2xl font-bold">
              All Posts
            </h2>

            {posts.length === 0 ? (
              <div className="mt-8 rounded-lg bg-gray-50 py-12 text-center">
                <p className="text-gray-600">
                  No posts match your search criteria. Please try different
                  filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8" id="posts-grid">
                {posts.map((post) => {
                  const formattedDate = post.pub_date
                    ? new Date(post.pub_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : '';

                  return (
                    <Card
                      key={post.id}
                      title={post.title}
                      image={
                        post.image
                          ? { src: post.image, alt: post.title }
                          : undefined
                      }
                      href={`/posts/${post.slug}`}
                    >
                      {/* Meta Info */}
                      <div className="mb-3 flex items-center gap-2 text-gray-600">
                        <Calendar size={18} />
                        <span>{formattedDate}</span>
                      </div>

                      {post.author && (
                        <div className="mb-3 flex items-center gap-2 text-gray-600">
                          <User size={18} />
                          <span>{post.author}</span>
                        </div>
                      )}

                      <p className="mb-4 line-clamp-3 text-gray-700">
                        {post.description}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-text-primary rounded-full bg-blue-200 px-2 py-1 text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <span className="text-text-primary hover:text-primary-700 font-medium">
                        Read More →
                      </span>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
