import Card from '../card';
import { getPosts } from '@/app/_lib/data-services';
import type { Post } from '@/types';
import { Calendar, User } from 'lucide-react';

interface Props {
  tags?: string[]; // optional if you have predefined tags
}

export default async function PostLists({ tags = [] }: Props) {
  const posts: Post[] = await getPosts();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-text-secondary mb-6 text-xl font-bold">
                Filter Posts
              </h2>

              {/* Search */}
              <div className="mb-6">
                <label
                  htmlFor="search"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search posts..."
                  className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
                />
              </div>

              {/* Tags Filter */}
              {tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2 block text-sm font-medium text-gray-700">
                    Tags
                  </h3>
                  <div className="space-y-2">
                    {tags.map((tag) => (
                      <label key={tag} className="flex items-center">
                        <input
                          type="checkbox"
                          className="tag-checkbox text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300"
                          value={tag}
                        />
                        <span className="ml-2 text-gray-700">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Filter */}
              <div className="mb-6">
                <label
                  htmlFor="author"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  placeholder="Filter by author..."
                  className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
                />
              </div>

              {/* Date Range Filter */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Date Range
                </label>

                <div>
                  <label
                    htmlFor="from-date"
                    className="mb-1 block text-xs text-gray-500"
                  >
                    From
                  </label>
                  <input
                    type="date"
                    id="from-date"
                    className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="to-date"
                    className="mb-1 block text-xs text-gray-500"
                  >
                    To
                  </label>
                  <input
                    type="date"
                    id="to-date"
                    className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
                  />
                </div>
              </div>

              {/* Reset Filters */}
              <button
                id="reset-filters"
                className="mt-6 w-full rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
              >
                Reset Filters
              </button>
            </div>
          </div>

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
