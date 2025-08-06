'use client';

import React from 'react';

export function PostListsSkeleton() {
  // Skeleton card component
  const SkeletonCard = () => (
    <div className="animate-pulse overflow-hidden rounded-lg bg-white shadow-sm">
      {/* Image Skeleton */}
      <div className="h-40 w-full bg-gray-200" />

      <div className="space-y-3 p-5">
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="h-4 w-16 rounded bg-gray-200" />
        <div className="h-5 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
        <div className="flex gap-2">
          <div className="h-5 w-12 rounded-full bg-gray-200" />
          <div className="h-5 w-12 rounded-full bg-gray-200" />
        </div>
        <div className="h-4 w-20 rounded bg-gray-200" />
      </div>
    </div>
  );

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 animate-pulse space-y-6 rounded-lg bg-white p-6 shadow-sm">
              <div className="h-6 w-32 rounded bg-gray-200" />

              {/* Search */}
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-10 w-full rounded bg-gray-200" />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-4 w-16 rounded bg-gray-200" />
                  <div className="h-4 w-16 rounded bg-gray-200" />
                  <div className="h-4 w-16 rounded bg-gray-200" />
                </div>
              </div>

              {/* Author */}
              <div className="space-y-2">
                <div className="h-4 w-28 rounded bg-gray-200" />
                <div className="h-10 w-full rounded bg-gray-200" />
              </div>

              {/* Date Range */}
              <div className="space-y-3">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-8 w-full rounded bg-gray-200" />
                  <div className="h-8 w-full rounded bg-gray-200" />
                </div>
              </div>

              <div className="h-10 w-full rounded bg-gray-200" />
            </div>
          </div>

          {/* Posts Skeleton Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 h-6 w-32 animate-pulse rounded bg-gray-200" />

            <div className="grid grid-cols-1 gap-8" id="posts-grid">
              {Array.from({ length: 4 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedArticlesSkeleton() {
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <article
              key={index}
              className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-md"
            >
              {/* Image skeleton */}
              <div className="h-52 w-full bg-gray-200" />

              <div className="space-y-3 p-6">
                <div className="h-3 w-24 rounded bg-gray-200" />
                <div className="h-5 w-3/4 rounded bg-gray-300" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-5/6 rounded bg-gray-200" />
                <div className="mt-4 h-4 w-32 rounded bg-gray-200" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
