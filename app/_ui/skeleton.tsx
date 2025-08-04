'use client';

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
